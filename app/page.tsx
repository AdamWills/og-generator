import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Image
        src="/og.jpeg"
        className="max-h-[100vh] w-auto"
        width={1536}
        height={2048}
        alt="OG Anunoby"
      />
    </main>
  );
}
