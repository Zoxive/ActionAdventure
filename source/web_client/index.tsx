/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typingscustom/react-dom.d.ts" />

import React = require("react");
import ReactDOM = require("react-dom");
//import inputEmitter = require("./config/inputEmitter");

class DemoProps
{
  public test:string;
}

class App extends React.Component<DemoProps, any>
{
  componentDidMount()
  {
  }

  render()
  {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <div>{this.props.test}</div>
      </div>
    );
  }
}

ReactDOM.render(<App test="lolz" />, document.getElementById("react"));
