/// <reference path="../../../typings/tsd.d.ts" />

import React = require("react");

interface IPlayerProps
{
  name:string;
  x: number;
  y: number;
}

class Player extends React.Component<IPlayerProps, any>
{
  getStyle()
  {
    return {
      position: "absolute",
      left: this.props.x,
      top: this.props.y,
    };
  }

  render()
  {
    return (
      <div style={this.getStyle()}>{this.props.name}</div>
    );
  }
}

export = Player;
