const express = require('express');
const port = 5000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = require('./config/mongoose');
const flash = require('connect-flash');
const flashFunc = require('./config/flash');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// setting up the view engine.
app.set('view engine', 'ejs');
app.set('views', 'views');

//Setting Up the layouts
app.use(expressLayouts);

//Using express session
app.use(
    session({
      secret: 'something',
      resave: true,
      saveUninitialized: true,
    })
  );


//Setting static assets folder
// app.use(express.static(path.join(__dirname, './assets')));


//Setting Up flash module
app.use(flash());
app.use(flashFunc.setFlash);

//Setting path for file to be uploaded by browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//extract style and script from Layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//All my Entry Routes
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!')
    }else{
        console.log(`Server Up and running at port:: ${port}`);
    }
})