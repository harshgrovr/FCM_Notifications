#!/usr/bin/env node

var environmentList = ['debug','staging','prod'];

var fs = require("fs");
var path = require("path");

console.log('-----------------------------');
//console.log("Running hook: "+path.basename(process.env.CORDOVA_HOOK));
 
var buildEnvironment = environmentList[0];

if (process.env.target && environmentList.indexOf( process.env.target ) > 0 ) {
	buildEnvironment = process.env.target;
	console.log( 'Setting environment');
}	
else {
	console.log( 'Using Default Environment' );
}

console.log('Using environment: ' + buildEnvironment);
var theSourceFile = path.join( path.resolve(),'www','js') + '/env.' + buildEnvironment + '.js';
var theDestinationFile = path.join( path.resolve(),'www','js') + '/env.js';

console.log( theSourceFile );
if (fs.existsSync(theSourceFile)) { 
  console.log('it exists');

	fs.readFile( theSourceFile, function(err, buf) {
		
		if (typeof buf !== 'undefined') {
			console.log('Read from file ' + theSourceFile);
			fs.writeFile(theDestinationFile, buf.toString() , function(err) {
				console.log('Wrote to file ' + theDestinationFile);
				console.log('-----------------------------');
				if (err) throw err;
			});
		}
		else {
			console.log('Config File ' + theSourceFile + ' NOT FOUND');
			console.log(theDestinationFile + ' NOT CHANGED');
			console.log('-----------------------------');
		}	
		
	});
}
else {
	console.log('Config File ' + theSourceFile + ' NOT FOUND');
	console.log(theDestinationFile + ' NOT CHANGED');
	console.log('-----------------------------');
}


// copy build-extra.gradle.js to build-extra.gradle

var src= path.join(path.resolve())+'/scripts/build-extras.js'
var dst = path.join(path.resolve())+'/platforms/android/build-extras.gradle'



// destination.txt will be created or overwritten by default.
fs.copyFile(src,dst , (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});
