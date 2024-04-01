/* eslint-disable react/jsx-key */
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";

export const POST = frames(async (ctx) => {
  console.log(ctx.url.pathname);
  if (ctx.pressedButton?.action === "post_redirect") {
    // Do something with the POST
    // when post_redirect button is clicked you must return a redirect response
    return redirect("https://google.com");
  }
  return {
    image: <div tw="flex">Advertisement</div>,
    buttons: [
      <Button action="post" target="/">
        Go Back
      </Button>,
      <Button action="post_redirect">Visit</Button>,
    ],
  };
});
