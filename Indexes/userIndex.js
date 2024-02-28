const express = require('express')
const {signup, login} = require('../Controllers/userController')

const Router = express.Router()

Router.post('/signup' , signup);
Router.post('/login' , login)
module.exports = Router;