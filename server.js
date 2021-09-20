const express = require('express')
const app = express();
const path = require('path');
const hbs = require('express-handlebars')
const route = require('./server/router/router')
require('./server/model/db')



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Serving static file
app.use(express.static(path.join(__dirname, 'public')));


//Set view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}));


app.use('/api', route)

const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`Server is started on http://localhost:${port}/api`));