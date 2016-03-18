var express = require('express');
var path = require('path');
var localConfig = require('./config');
var app = express();

app.use('/docs', express.static(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder)));

app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var FolderParse = require('./routes/folderParse.js');
var folderparse = new FolderParse();

app.get('/toolkit',function(req,res,next) {
		folderparse.retrieveToolkit(function(err,data){
			res.send(data);
		})
})

app.get('/gallery',function(req,res,next) {
		folderparse.retrieveGallery(function(err,thumbArray,fullImages){
			res.send([thumbArray,fullImages]);
		})
})


app.listen(localConfig.application.port, function(){
  console.log('Listening on port '+localConfig.application.port);
});
