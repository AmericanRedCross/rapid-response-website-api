var dir = require('node-dir');
var path = require('path');
var appConfig = require('../config');

var FolderParse = function(){ };

FolderParse.prototype.retrieveToolkit = function(cb){
  var filesPath = path.join(appConfig.application.dboxpath,appConfig.application.prjfolder,appConfig.application.resourcefolder);
  dir.files(filesPath, function(err,files){
      if (err) throw err;
      var list = files;
      var fileArray = [];
      console.log(list[22])
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(appConfig.application.resourcefolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(appConfig.application.resourcefolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

module.exports = FolderParse;
