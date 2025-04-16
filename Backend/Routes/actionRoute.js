import express from 'express';
const router = express.Router();
import { actionValidation } from '../Middlewares/ActionValidation.js';
import { EditPdf, DeletePdf, GetPdf } from '../Controllers/ActionController.js';

// Edit route
router.patch('/edit/:id', actionValidation, EditPdf);

router.delete('/delete/:id',actionValidation, DeletePdf);

router.get('/edit/:id', actionValidation, GetPdf);


export default router;