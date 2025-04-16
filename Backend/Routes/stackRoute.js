import express from 'express';
const router = express.Router();
import  {homeValidation}  from '../Middlewares/HomeValidation.js';
import  {homePage} from '../Controllers/HomeController.js';
import {book} from '../Controllers/BookController.js';
import {notebook} from '../Controllers/NotebookController.js';
import {findBooksAndNotebooks} from '../Controllers/ReadController.js';

router.get('/home', homeValidation, homePage);

router.get('/read',(req, res)=>{
    res.send("Read page");
})

router.get('/read/seen', (req, res)=>{
    res.send('Seen page');
})

router.get('/read/search', findBooksAndNotebooks);

router.get('/write',(req, res)=>{
    res.send('Write page');
})

router.post('/write/book',homeValidation, book);

router.post('/write/notebook',homeValidation, notebook);



export default router;