var fs = require('fs')
var jsonql = require('jsonql')
var express = require('express')

var app = express()

app.get('/:filename', function (req, res) {
  var result;
  try {
	//Gets the data from the json file according to the filename mentioned in the url
	var data = fs.readFileSync(req.params.filename+".json", 'utf8');
	var data_json = JSON.parse(data);
	//Defines the query string for "query" field in the url
	var query_string = "$."+req.query.query+".*";
	//Uses jsonql to provide the answer to that
	result = JSON.stringify(jsonql(query_string,data_json));
  }
  catch (e) {
	if (e.code === 'ENOENT') {
	  result = 'File not found!';
	}
	else {
	  throw e;
	}
  }
  res.send(result);
})

//The server listens on the port 4000
app.listen(4000)