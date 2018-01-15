var dir = require('node-dir'),
path = require('path'),
localConfig = require('../config');

var FolderParse = function(){

};

FolderParse.prototype.retrieveEssentials = function(cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,localConfig.application.websitefolder,localConfig.application.essentialsfolder),function(err,files){
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.prjfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.prjfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

FolderParse.prototype.retrieveAdditional = function(cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,localConfig.application.websitefolder,localConfig.application.additionalfolder),function(err,files){
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.prjfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.prjfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

module.exports = FolderParse;