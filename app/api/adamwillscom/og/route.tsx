import { ImageResponse } from "next/og";

export const runtime = "edge";

const getTextSize = (text: string) => {
  if (text.length < 30) {
    return "text-[164px]";
  }
  if (text.length < 50) {
    return "text-[128px]";
  }
  return "text-[96px]";
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const fontData = await fetch(
      new URL("../../../assets/sf-pro-black.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100) ?? "Default Title"
      : "My default title";

    const subTitle = searchParams.has("subtitle")
      ? searchParams.get("subtitle")?.slice(0, 100)
      : "";

    const textSize = getTextSize(title);

    return new ImageResponse(
      (
        <div
          tw={`${textSize} bg-white flex flex-col justify-center items-center text-center w-full h-full tracking-tighter uppercase font-black leading-[0.8]`}
          style={{
            fontFamily: "SF-Pro",
            lineClamp: 3,
            padding: "0 32px",
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
