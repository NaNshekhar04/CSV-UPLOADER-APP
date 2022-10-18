const express = require('express');
const port = 5000;
const app = express();

app.get('/', function(req, res){
    res.send('Hello world');
})

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!')
    }else{
        console.log(`Server Up and running at port:: ${port}`);
    }
})