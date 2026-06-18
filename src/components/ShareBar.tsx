"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { QuizMode, QuizResult } from "@/lib/types";
import {
  shareEmailBody,
  shareHeadline,
  shareMarkdown,
  sharePlainText,
  shareSummaryLine,
} from "@/lib/shareText";

interface ShareBarProps {
  result: QuizResult;
  mode: QuizMode;
  /** The stateless share code for this result (the segment after `/r/`). */
  code: string;
}

// Detect the Web Share API without a setState-in-effect (which the React Hooks
// lint rule forbids). useSyncExternalStore returns the server snapshot (false)
// during SSR and the real value on the client, with no hydration mismatch.
const subscribeNoop = () => () => {};
const getCanShare = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function";
const getCanShareServer = () => false;

export function ShareBar({ result, mode, code }: ShareBarProps) {
  const canNativeShare = useSyncExternalStore(
    subscribeNoop,
    getCanShare,
    getCanShareServer,
  );

  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  const flash = useCallback((msg: string) => {
    setNotice(msg);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 2500);
  }, []);

  const path = `/r/${code}`;
  const absoluteUrl = useCallback(
    () => (typeof window !== "undefined" ? `${window.location.origin}${path}` : path),
    [path],
  );

  const headline = shareHeadline(result);
  const summary = shareSummaryLine(result);

  const copy = useCallback(
    async (text: string, label: string) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          flash(`${label} copied`);
        } else {
          flash("Copying isn’t supported in this browser");
        }
      } catch {
        flash("Couldn’t copy — try selecting manually");
      }
    },
    [flash],
  );

  const imageUrl = useCallback(() => `${absoluteUrl()}/opengraph-image`, [absoluteUrl]);

  const makeImageBlob = useCallback(async (): Promise<Blob | null> => {
    try {
      const res = await fetch(imageUrl(), {
        cache: "no-store",
        headers: { Accept: "image/png" },
      });
      if (!res.ok) return null;
      const blob = await res.blob();
      return blob.size > 0 ? blob : null;
    } catch {
      return null;
    }
  }, [imageUrl]);

  const nativeShare = useCallback(async () => {
    const url = absoluteUrl();
    const data: ShareData = {
      title: `${headline} · Theories of Atonement`,
      text: summary,
      url,
    };
    try {
      const blob = await makeImageBlob();
      if (blob) {
        const file = new File([blob], "atonement-result.png", { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) data.files = [file];
      }
    } catch {
      /* the image is optional; share the text + url regardless */
    }
    try {
      await navigator.share(data);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return; // user cancelled
      void copy(url, "Link"); // fall back to copying the link
    }
  }, [absoluteUrl, headline, summary, copy, makeImageBlob]);

  const openIntent = useCallback((href: string) => {
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }, []);

  const navigate = useCallback((href: string) => {
    if (typeof window !== "undefined") window.location.href = href;
  }, []);

  const download = useCallback(
    (contents: string, filename: string, type: string) => {
      if (typeof window === "undefined") return;
      const objectUrl = URL.createObjectURL(new Blob([contents], { type }));
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
      flash(`Saved ${filename}`);
    },
    [flash],
  );

  // Intent handlers (built at click time so window.location.origin is correct).
  const onX = () =>
    openIntent(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(summary)}&url=${encodeURIComponent(absoluteUrl())}`,
    );
  const onThreads = () =>
    openIntent(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(`${summary} ${absoluteUrl()}`)}`,
    );
  const onFacebook = () =>
    openIntent(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl())}`,
    );
  const onWhatsApp = () =>
    openIntent(
      `https://wa.me/?text=${encodeURIComponent(`${summary} ${absoluteUrl()}`)}`,
    );
  const onSubstack = () => {
    openIntent("https://substack.com/notes");
    void copy(`${summary} ${absoluteUrl()}`, "Substack note text");
  };
  const onEmail = () =>
    navigate(
      `mailto:?subject=${encodeURIComponent(`My Theories of Atonement result: ${headline}`)}&body=${encodeURIComponent(shareEmailBody(result, mode, absoluteUrl()))}`,
    );
  const onSms = () =>
    navigate(`sms:?&body=${encodeURIComponent(`${summary} ${absoluteUrl()}`)}`);

  const onCopyLink = () => copy(absoluteUrl(), "Link");
  const onCopySummary = () => copy(`${summary} ${absoluteUrl()}`, "Summary");
  const onSaveImage = async () => {
    flash("Preparing image…");
    const blob = await makeImageBlob();
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "atonement-result.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
      flash("Saved atonement-result.png");
      return;
    }

    openIntent(imageUrl());
    flash("Opened the image in a new tab");
  };
  const onSaveTxt = () =>
    download(
      sharePlainText(result, mode, absoluteUrl()),
      "atonement-result.txt",
      "text/plain;charset=utf-8",
    );
  const onSaveMd = () =>
    download(
      shareMarkdown(result, mode, absoluteUrl()),
      "atonement-result.md",
      "text/markdown;charset=utf-8",
    );
  const onPrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const btn =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-navy/20 bg-white/70 px-3.5 py-2 text-sm font-medium text-navy transition hover:bg-white";
  const groupLabel =
    "text-xs font-semibold uppercase tracking-widest text-ink-soft";

  return (
    <section aria-labelledby="share-heading" className="card p-5 sm:p-6 print:hidden">
      <h2 id="share-heading" className="font-serif text-lg font-semibold text-navy">
        Share or save your result
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Your result is encoded in the link itself — there are no accounts, and
        nothing is stored on a server.
      </p>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {canNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className={`${btn} border-navy bg-navy text-parchment hover:bg-navy/90`}
            >
              Share…
            </button>
          )}
          <button type="button" onClick={onCopyLink} className={btn}>
            Copy link
          </button>
          <button type="button" onClick={onCopySummary} className={btn}>
            Copy summary
          </button>
          <button type="button" onClick={onEmail} className={btn}>
            Email
          </button>
          <button type="button" onClick={onSms} className={btn}>
            Text (SMS/RCS)
          </button>
        </div>

        <div>
          <p className={groupLabel}>Post to</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={onX} className={btn}>
              X
            </button>
            <button type="button" onClick={onThreads} className={btn}>
              Threads
            </button>
            <button type="button" onClick={onFacebook} className={btn}>
              Facebook
            </button>
            <button type="button" onClick={onWhatsApp} className={btn}>
              WhatsApp
            </button>
            <button type="button" onClick={onSubstack} className={btn}>
              Substack
            </button>
          </div>
        </div>

        <div>
          <p className={groupLabel}>Save</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={onSaveImage} className={btn}>
              Image (.png)
            </button>
            <button type="button" onClick={onSaveTxt} className={btn}>
              Text (.txt)
            </button>
            <button type="button" onClick={onSaveMd} className={btn}>
              Markdown (.md)
            </button>
            <button type="button" onClick={onPrint} className={btn}>
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        Substack doesn’t offer a public web share intent, so this opens Notes and
        copies paste-ready text. Instagram, Signal and RCS also don’t accept
        shared links from the web. Use {canNativeShare ? "“Share…”" : "your device’s share menu"} or save the
        result to post through those apps.
      </p>

      <p
        role="status"
        aria-live="polite"
        className="mt-2 h-4 text-xs font-semibold text-forest"
      >
        {notice}
      </p>

      {/* PNG sharing/downloading uses the same generated Open Graph image route. */}
    </section>
  );
}
