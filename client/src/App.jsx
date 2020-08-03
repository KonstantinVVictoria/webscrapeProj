import React from "react";
import G_State from "g_state-management"; //Importthe module to gain access to the global state.
import Overlay from "./components/Overlay";
import Display from "./components/Display";
G_State.debug({ live: true }); //You can enable the debug mode to monitor any global state changes.
const { vh, vw, isMobile, youtube_video } = G_State.now; //Extrapolate the global properties via desctructuring.
/*Alternatively, you can use the global properties by stating its path from G_State.now. 
  For example:  G_State.now.youtube_video

  Note that G_State.now is equivalent to the the state object defined in G_State.js

*/
let dependancies = G_State.link(
  "youtube_video"
); /*Think of the global properties that should affect the component when they are changed.
     They are also the global properties that will cause the component to render again*/
const App = () => {
  const sendQuery = (event) => {
    if (
      event.key === "Enter" &&
      event.target.value &&
      youtube_video.subtitles.isLoading !== "Loading" &&
      youtube_video.subtitles.isLoading !== "Parsing Subtitles"
    ) {
      //Directly access any global property from any component.
      if (youtube_video.link.verify(event.target.value))
        youtube_video.subtitles.from_request(event.target.value);
      document.getElementsByClassName("input")[0].value = "";
    }
  };
  return (
    <div
      className="menu-container"
      style={{
        height: isMobile ? vh(100) : "",
        width: isMobile ? vw(100) : "",
        marginTop: isMobile ? "0px" : "",
      }}
    >
      <Overlay />
      {
        youtube_video.isDisplayed ? <Display /> : ""
        /*
       This is where the component is dependant on the property youtube_video.
       If youtube_video.isDisplayed is changed, the component should know and render again to visually reflect the change. 
       This allows you to decide whether or not App displays the Display component from any component.
       */
      }
      <input
        className="input"
        onKeyDown={sendQuery}
        style={{
          height: isMobile ? vh(100 * 0.05) : "",
          width: isMobile ? vw(100 * 0.8) : "",
          padding: isMobile ? "0px" + vh(5 / 2) + " 0px" : "",
          fontSize: vh(2),
        }}
      />
    </div>
  );
};

export default G_State.updates(App, dependancies);
//If your functional component needs to be updated by a global property, export it
//inside the wrapper method updates with the arguments updates(component, dependancies, actions).
