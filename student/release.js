var versiony = require('versiony');
versiony.from('package.json').patch().preRelease('').to('package.json');

const version = require('./package.json').version;
const versionJs = "export const AppVersion = '" + version + "';"

var fs = require('fs');
fs.writeFile("src/AppVersion.js", versionJs, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("AppVersion.js are updated with " + version );
}); 

