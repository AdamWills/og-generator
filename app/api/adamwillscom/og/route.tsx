import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fontData = await fetch(
      new URL("../../../assets/SF-Pro-Display-Black.otf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    const subTitle = searchParams.has("subtitle")
      ? searchParams.get("subtitle")?.slice(0, 100)
      : "";

    return new ImageResponse(
      (
        <div
          tw="flex flex-col justify-center items-center text-center w-full h-full text-[192px] tracking-tighter uppercase font-black leading-[0.8]"
          style={{
            fontFamily: "SF-Pro",
          }}
        >
          <div tw="text-6xl tracking-tight leading-normal">{subTitle}</div>
          {title}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "SF-Pro",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
