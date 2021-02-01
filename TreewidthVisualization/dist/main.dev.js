"use strict";

requirejs.config({
  paths: {
    "jquery": ["https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min", // If the CDN fails, load from this local module instead
    "lib/jquery"]
  }
});