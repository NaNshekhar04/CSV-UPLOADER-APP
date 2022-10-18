const express = require('express');
const port = 5000;
const app = express();

const expressLayouts = require('express-ejs-layouts');

// setting up the view engine.
app.set('view engine', 'ejs');
app.set('views', 'views');

//Setting Up the layouts
app.use(expressLayouts);


app.use(express.static('assets'));

app.use('/uploads/csv', express.static(__dirname + '/uploads/csv'));

//All my Entry Routes
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!')
    }else{
        console.log(`Server Up and running at port:: ${port}`);
    }
})