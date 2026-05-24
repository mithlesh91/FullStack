const express = require('express')
const routers = express.Router()
const validation = require('../middleware/validation/validation')
const authMiddleware = require('../middleware/auth.middleware')

const controllers = require('../controllers/auth.controllers')

routers.post('/register', validation, controllers.register)
  

routers.post('/login', controllers.login)
routers.get('/getuser', authMiddleware, controllers.getuser)
routers.get('/logout', authMiddleware, controllers.logout)

module.exports = routers