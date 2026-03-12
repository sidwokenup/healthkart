import { submitIndexNow } from "@/lib/indexnow";

export async function POST(req: Request) {
  const body = await req.json();
  const urls = body.urls || [];

  await submitIndexNow(urls);

  return Response.json({
    success: true
  });
}
