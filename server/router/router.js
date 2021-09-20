const route = require('express').Router();
const {home, upload, login, register, delImg } = require('../controller/controller')
const store = require('../middleware/multer')
const catchError = require('../middleware/multer')





//routes
route.get('/', home);

route.post('/uploadmultiple', store, upload,  catchError )

route.post('/login', login)

route.post('/register', register)

//delete list record
route.get('/delete/:id', delImg)




module.exports = route;