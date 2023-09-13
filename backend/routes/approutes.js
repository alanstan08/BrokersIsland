const express = require('express');
const { signUp, logIn, getUserHompage, updateUserModel, accessUserInfo } = require('../controllers/brokerController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//home page

//about page
//sign up page 
router.post('/sign-up', signUp)
//login page 
router.post('/login', logIn)
router.use(requireAuth)
router.get('/userhomepage',getUserHompage )
router.post('/add-user-property', updateUserModel)
router.get('/brokerHomepage', accessUserInfo)
module.exports = router