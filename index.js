const express = require('express');
const port = 5000;
const app = express();


// setting up the view engine.
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!')
    }else{
        console.log(`Server Up and running at port:: ${port}`);
    }
})