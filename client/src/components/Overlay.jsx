import React from "react";
import G_State from "g_state-management";
let dependancies = G_State.link("youtube_video");
const { youtube_video, vh } = G_State.now;
const Loader = () => {
  return (
    <div className="loader" style={{ fontSize: vh(6) }}>
      {youtube_video.subtitles.isLoading}
    </div>
  );
};
export default G_State.updates(Loader, dependancies);
