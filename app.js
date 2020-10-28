var express = require('express');
var path = require('path');
var appConfig = require('./config');
var app = express();

app.use('/docs', express.static(path.join(appConfig.application.dboxpath,appConfig.application.prjfolder)));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var FolderParse = require('./routes/folderParse.js');
var folderparse = new FolderParse();

app.get('/toolkit',function(req,res,next){
  console.log(req.query)
	folderparse.retrieveToolkit(function(err,data){
		res.send(data);
	})
})

app.listen(appConfig.application.port, function(){
  console.log('Listening on port ' + appConfig.application.port);
});
