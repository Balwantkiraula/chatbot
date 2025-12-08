import mongoose from 'mongoose';

const botSchema = new mongoose.Schema({
   
    text : {
        type: String,
        required: true
    },
    timestamp : {
        type: Date,
        default: Date.now
    }
}); 
const bot = mongoose.model('bot', botSchema);
export default bot;