/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typingscustom/react-dom.d.ts" />

import React = require("react");
import ReactDOM = require("react-dom");

class DemoProps
{
  public test:string;
}

class App extends React.Component<DemoProps, any>
{
  static defaultProps = { test: "adsf3" };

  render()
  {
    return <div>{this.props.test}</div>
  }
}

ReactDOM.render(<App test="lolz" />, document.getElementById("react"));
