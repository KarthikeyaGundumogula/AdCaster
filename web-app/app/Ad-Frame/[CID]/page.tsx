// ./app/page.tsx
import { fetchMetadata } from "frames.js/next";
import { useParams } from "next/navigation";

export async function generateMetadata() {
  const CID = useParams().CID;
  return {
    title: "My Page",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        `/Ad-Frame/frames/${CID}`,
        process.env.VERCEL_URL
          ? `https://{process.env.VERCEL_URL}`
          : "http://localhost:3000"
      )
    ),
  };
}

export default function Page() {
  return <span>Hello Doctor HOw are you doing</span>;
}
