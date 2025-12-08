import express from 'express';
import { message } from '../Controllers/chatbot.message.js';
const router = express.Router();

router.post('/message', message);

 export default router;

