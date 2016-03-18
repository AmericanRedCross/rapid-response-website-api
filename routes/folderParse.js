var dir = require('node-dir'),
path = require('path'),
localConfig = require('../config');

var FolderParse = function(){

};




FolderParse.prototype.retrieveToolkit = function(cb){

  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,localConfig.application.toolkitfolder), function(err, files) {
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

FolderParse.prototype.retrieveGallery = function(cb){

  dir.files(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder,localConfig.application.galleryfolder), function(err, files) {
      if (err) throw err;
      var list = files;
      var thumbArray = [];
      var fullImages = {};
      for(var i = 0; i < list.length; i++){

        if(localConfig.application.validgalleryext.indexOf(path.extname(list[i]).toLowerCase()) !== -1){
          // valid image file extension
          if(path.basename(list[i]).indexOf("_THUMB") === -1){
            // not a thumbnail
            var extLeng = path.extname(list[i]).length;
            var fileName = path.basename(list[i]).slice(0,-(extLeng));
            fullImages[fileName] = path.basename(list[i]);
          } else {
            var fileObject = {
              "basename" : path.basename(list[i]),
              "ext": path.extname(list[i]),
              "dboxpath": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.galleryfolder)),
              "dboxpathparts": path.dirname(list[i]).slice(list[i].indexOf(localConfig.application.galleryfolder)).split(path.sep),
              "fullpath": list[i]
            };
            thumbArray.push(fileObject);
          }
        }

      }
      cb(err,thumbArray,fullImages);

  });

}

module.exports = FolderParse;
