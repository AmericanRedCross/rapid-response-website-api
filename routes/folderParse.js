var dir = require('node-dir'),
path = require('path'),
localConfig = require('../config');

var systemFile = function(filename){
  if (filename.indexOf('.') === 0){
    return true;
  } else { return false; }
};

var FolderParse = function(){

};

FolderParse.prototype.retrieveEssentials = function(language,cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,language,localConfig.application.essentialsfolder),function(err,files){
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.essentialsfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.essentialsfolder)).split(path.sep),
          "fullpath": list[i]
        };
        if(systemFile(path.basename(list[i])) === false){
          fileArray.push(fileObject);
        }
      }
      cb(err,fileArray);
  });
}

FolderParse.prototype.retrieveAdditional = function(language,cb){
  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,language,localConfig.application.additionalfolder),function(err,files){
      if (err) throw err;
      var list = files;
      var fileArray = [];
      for(var i = 0; i < list.length; i++){
        var fileObject = {
          "basename" : path.basename(list[i]),
          "ext": path.extname(list[i]),
          "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.additionalfolder)),
          "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.additionalfolder)).split(path.sep),
          "fullpath": list[i]
        };
        fileArray.push(fileObject);
      }
      cb(err,fileArray);
  });
}

module.exports = FolderParse;
