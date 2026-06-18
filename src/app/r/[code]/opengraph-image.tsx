import {
  SHARE_IMAGE_ALT as alt,
  SHARE_IMAGE_CONTENT_TYPE as contentType,
  SHARE_IMAGE_SIZE as size,
  buildShareImageResponse,
} from "@/lib/shareImage";

export { alt, contentType, size };

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return buildShareImageResponse(code);
}
