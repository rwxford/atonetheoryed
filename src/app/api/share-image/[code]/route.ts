import { buildShareImageResponse } from "@/lib/shareImage";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/share-image/[code]">,
) {
  const { code } = await ctx.params;
  const response = buildShareImageResponse(code);
  response.headers.set(
    "Content-Disposition",
    'attachment; filename="atonement-result.png"',
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}
