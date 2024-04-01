/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async (ctx) => {
  console.log(ctx.url.pathname);
  return {
    image: <div tw="flex">Welcome</div>,
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
