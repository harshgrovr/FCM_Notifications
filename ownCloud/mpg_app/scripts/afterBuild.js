#!/usr/bin/env node


const fs = require('fs');
var path = require("path");

var theDestinationFile = path.join(path.resolve()) + '/platforms/android/app/build.gradle';

console.log(theDestinationFile);



var projectGradleFile = path.join(path.resolve()) + '/platforms/android/build.gradle';

fs.readFile(projectGradleFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace("google-services:4.2.0'", "google-services:4.1.0'");


  fs.writeFile(projectGradleFile, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});



fs.appendFile(theDestinationFile, "apply plugin: 'com.google.gms.google-services'\n", function (err) {
  if (err) throw err;
  console.log('Saved!');
});


