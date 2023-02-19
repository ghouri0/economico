const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/register', function(err,req, res){
    console.log(req.body);
})

app.listen(5000, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("server started");
    }
})