/// <reference path="../../../typings/tsd.d.ts" />

import React = require("react");
import Player = require("../pawns/player.tsx");

import inputEmitter = require("../config/inputEmitter.ts");

interface IPlayerHandlerProps
{
  player: typeof Player;
  name: string;
}

interface IPlayerHandlerState
{
  x: number;
  y: number;
}

class PlayerHandler extends React.Component<IPlayerHandlerProps, IPlayerHandlerState>
{
  state = { x: 0, y: 0};

  componentDidMount()
  {
    inputEmitter.addListener("click", (e:MouseEvent) =>
    {
      this.setState({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }

  render()
  {
    var Player = this.props.player;

    var props =
    {
      name: this.props.name,
      x: this.state.x,
      y: this.state.y,
    };

    return (
      <Player {...props} />
    );
  }
}

export = PlayerHandler;
