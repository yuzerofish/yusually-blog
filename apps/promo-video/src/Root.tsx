import { Composition } from "remotion";

import {
  BlogStarterPromo,
  VIDEO_DURATION,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./BlogStarterPromo";

export const RemotionRoot = () => {
  return (
    <Composition
      component={BlogStarterPromo}
      durationInFrames={VIDEO_DURATION}
      fps={VIDEO_FPS}
      height={VIDEO_HEIGHT}
      id="BlogStarterPromo"
      width={VIDEO_WIDTH}
    />
  );
};
