import { createFrames } from "frames.js/next";

export type State = {
  AdDestinataion: string;
};
export const frames = createFrames<State>({
  basePath: "/frames-api/",
  initialState: {
    AdDestinataion: "",
  },
});
