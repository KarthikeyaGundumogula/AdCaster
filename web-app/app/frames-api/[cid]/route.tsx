/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async (ctx) => {
  const path = ctx.url.pathname;

  const cid = path.split("/")[2];
  const imageURL = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`;
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return {
    image: imageURL,
    buttons: [
      // With query params
      // Without query params
      <Button action="post" target="/Ad/adid">
        Go to Ad
      </Button>,
    ],
  };
});

export const GET = handler;
export const POST = handler;
