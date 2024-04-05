/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async ({ ctx, url, state }) => {
  const path = url.pathname;
  const cid = path.split("/")[2];
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`
  );
  const res = await data.json();
  const currentState = state;
  const imageURL = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${res.image}`;
  const target = `${cid}/Ad/${res.adId}`;
  const updatedState = {
    ...currentState,
    AdDestinataion: res.adDestinationUrl,
  };
  return {
    image: imageURL,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: target,
          query: {
            adImage: res.adImage,
          },
        }}
      >
        {res.adSubText}
      </Button>,
    ],
    state: updatedState,
  };
});

export const GET = handler;
export const POST = handler;
