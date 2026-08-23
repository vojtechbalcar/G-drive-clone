import { NextRequest, NextResponse } from "next/server";
import { constructDownloadUrl } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const bucketFileId = request.nextUrl.searchParams.get("fileId");
  const fileName = request.nextUrl.searchParams.get("fileName");

  if (!bucketFileId || !fileName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const url = constructDownloadUrl(bucketFileId);
  const response = await fetch(url);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: response.status },
    );
  }

  const blob = await response.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
