/*
  Konstantin Victoria
*/

/*
  What is G_State? 
  G_State is a global state paradigm that makes it easier to use global properties.
  
  In this paradigm, you define a global state, decide and document how it is changed,
  and render the components affected.
*/
import G_State from "g_state-management"; //Import G_State
const toxicity = require("@tensorflow-models/toxicity");
const threshold = 0.3;
const loadedToxicity = toxicity.load(threshold);

let initialVh = window.innerHeight;
let initialVw = window.innerWidth;

//First, create an object that contains all the global properties that can be accessed by any component and is used by multiple components.
//Structure your data and add default values. Default values/literals can be overwritten after the State description.

//State description//
let State = {
  //This is your state blueprint. The present state can be accessed from any component through G_State.now.
  //It is recommended to reference to this state via G_State.now in your component descriptions.
  window_url: { value: null }, //It is recommended that you add a value property to your properties, so you can access the embedded changeTo function.
  vh: null, //But you can still have properties that do not have a value property. You will just lose access to the embedded changeTo function.
  vw: null,
  youtube_video: {
    isDisplayed: false,
    link: { value: "", verify: () => {} },
    subtitles: {
      toxicityReport: {},
      analyze: () => {}, //It is recommended that you write any properties that you describe after the State description in the State as well.
      parseJSON: () => {}, //It makes it easier to visualize the structure of data in your global state.
      link: "",
      isLoading: "",
      value: null, //Example of a value property
      from_request: () => {
        return false;
      },
    },
  },
  isMobile: null,
};
/*

  What are the proper ways of modifying a global property and change the global state?
  There are two proper ways: explicitly and implicitly.

  Here is our global state in G_State.jsx:

  //G_State.jsx//
  let state = { 
    property: {value: null}
  };

  export default state
  //G_State.jsx//

  >>Here's how you would modify a global property explicitly<<

  //Components.jsx//
  import G_State from "g_state-management";
  .
  .
  .
  let newState = {}; -- Create a new state.
  newState.property = () => { --Think of the property you want to change, and then attach a 
                                method property that is named the same as the property you want to change to the new state. 
                                Simply put, describe the new state. 
    
    property++;                -- Describe how that property is changed.
  }

  G_State.changesTo(newState) -- Finally, update the property and the components that are affected.
  //Components.jsx//

  >>Here's how you would modify a global property implicitly<<
  --Note: you can modify a global property implicitly only if it has a value property.

  //Components.jsx//
  import G_State from "g_state-management";  
  .
  .
  .
  G_state.property.changesTo("incremted_by_one", property + 1);
  //Components.jsx//

*/

//After The State description://

//Further define your global properties below
State.vh = (unit) => {
  return (initialVh * unit) / 100 + "px";
};
State.vw = (unit) => {
  return (initialVw * unit) / 100 + "px";
};

State.isMobile = window.innerWidth < 1000;

State.youtube_video.link.verify = (link) => {
  let newState = {};
  let isLink = link.indexOf("https://www.youtube.com/watch?v=") > -1;
  newState.youtube_video = () => {
    State.youtube_video.link.value = isLink ? link : null;
    State.youtube_video.subtitles.isLoading = isLink
      ? "Verifying Link"
      : "Not a valid link";
    return "verified_link";
  };
  G_State.changesTo(newState);
  return isLink;
};

State.youtube_video.subtitles.from_request = async (request) => {
  let newState = {};

  newState.youtube_video = () => {
    State.youtube_video.isDisplayed = false;
    State.youtube_video.subtitles.isLoading = "Loading";
    return "fetching_subtitles";
  };

  G_State.changesTo(newState);

  const link = await new Promise((resolve) =>
    fetch("http://localhost:5000/get-youtube-subtitles-link", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        youtubeLink: request,
      }),
    }).then((response) => {
      response.json().then((body) => {
        resolve(body);
      });
    })
  );

  if (link) {
    State.youtube_video.subtitles.link = link;
    State.youtube_video.subtitles.parseJSON(State.youtube_video.subtitles.link);
  } else {
    newState.youtube_video = () => {
      State.youtube_video.subtitles.isLoading =
        "Error could not fetch subtitles";
      State.youtube_video.subtitles.link = "";
      return "did_not_recieve_subtitles";
    };
    G_State.changesTo(newState);
  }
};

State.youtube_video.subtitles.parseJSON = async ({ link }) => {
  let newState = {};
  let data = await new Promise((resolve) =>
    fetch(link)
      .then((request) => {
        return request.json();
      })
      .then((data) => {
        resolve(data);
      })
  );
  let subtitles = "";

  for (let i = 1; i < data.events.length; i++) {
    data.events[i].segs.forEach(
      (seg) => (subtitles += seg.utf8 === "\n" ? " " : seg.utf8)
    );
  }
  if (subtitles) {
    newState.youtube_video = () => {
      G_State.now.youtube_video.subtitles.value = subtitles;
      G_State.now.youtube_video.subtitles.isLoading = "Parsing Subtitles";
      return "aquired_subtitles_now_parsing";
    };
    G_State.changesTo(newState);
    State.youtube_video.subtitles.analyze();
  }
};

State.youtube_video.subtitles.analyze = async () => {
  let newState = {}; //Create a new state object. This will be used later to declare changes made to the global state
  let toxicityReport = await new Promise((resolve) => {
    loadedToxicity.then((model) => {
      model
        .classify(State.youtube_video.subtitles.value)
        .then((predictions) => {
          resolve(predictions);
        });
    });
  });
  newState.youtube_video = () => {
    State.youtube_video.subtitles.toxicityReport = toxicityReport;
    State.youtube_video.isDisplayed = true;
    State.youtube_video.subtitles.isLoading = "";
    return "analyzed_and_composed_toxicity_report";
  };
  //You can combine additional changes to the other global state properties like so:
  /*newState.vh = () => {
    State.vh = null
    return "cleared_vh"
  }

    Note after this declaration, the newState object will have two property methods: youtube_video and vh.
  */
  G_State.changesTo(newState); //Update the state and broadcast the changes
  //If you need to update to the state again, simply make a new newState object and update the state
  /*let newState = {}
    newState.vh = () => {
    State.vh = null
    return "cleared_vh"
  }
  G_State.changesTo(newState)
  */
};
export default State;
