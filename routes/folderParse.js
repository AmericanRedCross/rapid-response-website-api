var dir = require('node-dir'),
path = require('path'),
localConfig = require('../config');

var FolderParse = function(){

};

FolderParse.prototype.retrieveToolkit = function(language, cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,language,localConfig.application.toolkitfolder), function(err, files) {
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.toolkitfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.toolkitfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

FolderParse.prototype.retrieveModalities = function(language, cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,language,localConfig.application.modalitiesfolder), function(err, files) {
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.modalitiesfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.modalitiesfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

FolderParse.prototype.retrieveResources = function(language, cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,language,localConfig.application.resourcesfolder), function(err, files) {
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.resourcesfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.resourcesfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

FolderParse.prototype.retrieveDataManagement = function(language, cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,language,localConfig.application.datamanagementfolder), function(err, files) {
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.datamanagementfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.datamanagementfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

module.exports = FolderParse;
