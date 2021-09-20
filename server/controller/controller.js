require('dotenv').config()

const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const UploadModel = require('../model/schema')


let username_ = process.env.NAME;
let password_ = process.env.PASSWORD;


exports.login =  async(req, res) => {
    
    const { username, password } = req.body
    let compare = username === username_ ? true : false

    try {
        if(password == password_ && compare ){
            res.cookie('flag', 'admin', {path: '/api', secure: true, maxAge: 3600 })
            res.redirect('/api')
        } 
        else{
            res.cookie('flag', 'deny', {path: '/api', secure: true })
            res.redirect('/api')
        }  
    } catch (error) {
        res.status(500)
    }

}


exports.register = async(req, res) => {
    try {
        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = { username: req.body.username, password: hashedPassword }
        users.push(user)
        res.sendStatus(201)
    }catch (error) {
        res.sendStatus(500)
    }  
}

exports.home = async(req, res) => {
    const all_images = await UploadModel.find()
    res.render('main', {images: all_images});
} 

exports.upload = (req, res, next) => {
    const files = req.files

    if(!files){
        const error = new Error('Please Choose Files')
        error.httpStatusCode = 400;
        return next(error)
    }

    //convert images into base 64 encoding
    let imgArray = files.map( file => {
        let img = fs.readFileSync(file.path)        //converting image into buffer and storing into img
        return encode_img = img.toString('base64')
    });

    let result = imgArray.map((src, index) => {
        //create object to store in the database collection
        let final_img = {
            filename: files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src
        }
        let newUpload = new UploadModel(final_img);
        
        return newUpload
        .save()
        .then(()=> {
            return {msg: `${files[index].originalname} Uploaded Sucessfully..`}
        }).catch(err => {
            if(err){
                if(err.name === 'MongoError' && err.code === 11000){    //11000 refers to the mongodDb duplicate data
                    return Promise.reject({'err':`Duplicate ${files[index].originalname}. File Already exist!`});
                }
                return Promise.reject({err: err.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
            }
        })
    })
    Promise.all(result)
    .then(msg => {
        // res.json(msg)
        res.redirect('/api')
    }).catch(err => {
        res.json(err)
    })
}

exports.delImg =  (req, res) => {
    let _id = req.params.id
    UploadModel.findByIdAndRemove(_id, (err, doc) => {
        !err ? res.redirect('/api') : console.log("Error in deletion" + err)
    });
};


function authenticateToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
} 