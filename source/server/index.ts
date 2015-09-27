/// <reference path="../../typings/tsd.d.ts" />
import express = require("express");

var app = express();

//app.use(express.static("wwwroot"));

app.listen(3000);

console.log("Started http server on localhost:3000");
