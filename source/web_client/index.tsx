/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typingscustom/react-dom.d.ts" />

import React = require("react");
import ReactDOM = require("react-dom");

import PlayerHandler = require("./handler/playerhandler.tsx");
import Player = require("./pawns/player.tsx");

interface IDemoProps
{
  test:string;
}

class App extends React.Component<IDemoProps, any>
{
  render()
  {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <PlayerHandler player={Player} name="Player" />
      </div>
    );
  }
}

ReactDOM.render(<App test="lolz" />, document.getElementById("react"));
