/// <reference path="../../typings/tsd.d.ts" />
//import Router = require('react-router');
import React = require('react');

//var Route = Router.Route;

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

React.render(<App test="lolz" />, document.body);

/*
var routes =
(
  <Route name="app" handler={App} path="/">
	</Route>
);

Router.run(routes, function(Handler)
{
  React.render(<Handler />, document.body);
});
*/
