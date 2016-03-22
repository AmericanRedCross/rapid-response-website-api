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

app.post('/toolkit',function(req,res,next) {
    var language = (req.body.language === undefined) ? "en" : req.body.language;
		folderparse.retrieveToolkit(language, function(err,data){
			res.send(data);
		})
})

app.post('/resources',function(req,res,next) {
    var language = (req.body.language === undefined) ? "en" : req.body.language;
		folderparse.retrieveToolkit(language, function(err,data){
			res.send(data);
		})
})


app.listen(localConfig.application.port, function(){
  console.log('Listening on port '+localConfig.application.port);
});
