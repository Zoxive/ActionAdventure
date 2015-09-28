/// <reference path="../typings/react/react.d.ts" />

declare module "react-dom"
{
  import React = require("react");

  module ReactDOM
  {
    function render<P>(
        element: React.DOMElement<P>,
        container: Element,
        callback?: () => any): React.DOMComponent<P>;
    function render<P, S>(
        element: React.ReactElement<P>,
        container: Element,
        callback?: () => any): React.Component<P, S>;
  }
  export = ReactDOM
}
