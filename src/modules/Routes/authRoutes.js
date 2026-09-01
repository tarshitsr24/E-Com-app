const express = require("express");
const router = express.Router();
const validate = require('../Middleware/validate.js');
const  { registerUserSchema }= require('../validations/user.validation.js');
// import { registerUser } from '../auth/authController.js';

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  changePasswordUserController,
} = require("../Controllers.js/authController.js");

router.post("/register", validate(registerUserSchema) ,registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);
router.post("/refreshUserController", refreshUserController);
router.post("/changePasswordUserController", changePasswordUserController);

module.exports = router;



 
 
