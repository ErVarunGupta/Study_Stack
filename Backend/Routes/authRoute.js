import express from 'express';
const router = express();

import { studentSignupValidation , studentLoginValidation } from '../Middlewares/studentValidation.js';
import { facultySignupValidation, facultyLoginValidation } from '../Middlewares/facultyValidation.js';

import { studentLogin, studentSignup } from '../Controllers/studentController.js';
import { facultySignup, facultyLogin } from '../Controllers/facultyController.js';

import { getUser } from '../Controllers/Uploader.js';
import FacultyModel from '../Models/Faculty-Model.js';
import { viewValidation } from '../Middlewares/ViewValidataion.js';
import {viewUser} from '../Controllers/viewController.js';

import { userEditValidation } from '../Middlewares/EditUserValidation.js';
import { editUser } from '../Controllers/EditUserController.js';

router.get('/', (req, res)=>{
    res.send("Root route");
})

router.post('/faculty-signup',facultySignupValidation, facultySignup);

router.post('/faculty-login',facultyLoginValidation, facultyLogin);

router.post('/student-signup',studentSignupValidation,  studentSignup);

router.post('/student-login',studentLoginValidation, studentLogin);

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await FacultyModel.findById(id);
    res.send(user);
})

router.get('/view/:id', viewValidation, viewUser);

router.patch('/edit/:id', userEditValidation, editUser);
router.get('/faculty-edit', (req, res)=>{
    res.send("faculty edit page");
})
router.get('/student-edit', (req, res)=>{
    res.send('/student edit page');
})

export default router;