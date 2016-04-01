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

app.get('/toolkit/:language',function(req,res,next) {
		folderparse.retrieveToolkit(req.params.language, function(err,data){
			res.send(data);
		})
})

app.get('/modalities/:language',function(req,res,next) {
		folderparse.retrieveModalities(req.params.language, function(err,data){
			res.send(data);
		})
})

app.get('/resources/:language',function(req,res,next) {
		folderparse.retrieveResources(req.params.language, function(err,data){
			res.send(data);
		})
})

app.listen(localConfig.application.port, function(){
  console.log('Listening on port '+localConfig.application.port);
});
