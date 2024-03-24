/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/examples/Ad-Frame/frames",
});

const handleRequest = frames(async (ctx) => {
  const pageIndex = Number(ctx.searchParams.pageIndex || 0);
  let imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/300/200`;
  if (pageIndex === 1) {
    imageUrl = `https://picsum.photos/seed/frames.js-${pageIndex}/200/100`;
  }

  return {
    image: (
      <div tw="flex flex-col">
        <img src={imageUrl} width={300} height={200} alt="Image" />
        <div tw="flex">
          {pageIndex === 1 ? "This is an ad" : `This is slide ${pageIndex + 1}`}
        </div>
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={{
          query: { pageIndex: pageIndex + 1 },
        }}
      >
        {pageIndex === 1 ? "Buy" : `50% Off on all the sneaker Hood ->`}
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
