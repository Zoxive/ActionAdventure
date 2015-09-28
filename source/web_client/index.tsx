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
  render()
  {
    return (
      <div>
        <div>{this.props.test}</div>
      </div>
    );
  }
}

ReactDOM.render(<App test="lolz" />, document.getElementById("react"));
