var express = require('express');
var path = require('path');
var localConfig = require('./config');
var cors = require('cors');
var app = express();

app.use('/docs', express.static(path.join(localConfig.application.dboxpath,localConfig.application.prjfolder)));

app.use(cors());

var FolderParse = require('./routes/folderParse.js');
var folderparse = new FolderParse();

app.get('/files',function(req,res,next) {
		folderparse.retrieveFiles(function(err,list){
			res.json({data: list});
		})
})

app.listen(localConfig.application.port, function(){
  console.log('Listening on port '+localConfig.application.port);
});
