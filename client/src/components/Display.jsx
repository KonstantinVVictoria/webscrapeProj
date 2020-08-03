import React, { Component } from "react";
import G_State from "g_state-management";
let { youtube_video, vh } = G_State.now;

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {}; //For class components, you must first define a state.
    this.state.G_dependancies = G_State.link("youtube_video"); //Then define properties that affect it
    G_State.updates(this); //and connect the component to the global state.
  }

  populateToxicityPills = () => {
    let pills = [];

    youtube_video.subtitles.toxicityReport.forEach((report, i) => {
      if (report.results[0].match) {
        pills.push(
          <div className="pill-meter" key={"meter " + i}>
            <p
              className="pill-meter-bar-label"
              style={{ fontSize: vh(3) }}
              key={"label + i"}
            >
              {report.label}
            </p>
          </div>
        );
      }
    });

    if (pills.length === 0) {
      pills.push(
        <div
          className="pill-meter"
          style={{ backgroundColor: "rgb(27, 179, 65)" }}
          key="meter"
        >
          <p
            className="pill-meter-bar-label"
            style={{ fontSize: vh(3) }}
            key="label"
          >
            Clean!
          </p>
        </div>
      );
    }
    return pills;
  };
  render() {
    return (
      <div className="display">
        <iframe
          width="70%"
          height="60%"
          src={
            "https://www.youtube.com/embed/" +
            youtube_video.link.value.substring(
              youtube_video.link.value.indexOf("watch?v=") + 8,
              youtube_video.link.value.length
            )
          }
        />
        <div className="pills-container">{this.populateToxicityPills()}</div>
      </div>
    );
  }
}

export default Display;
