import mongoose from 'mongoose';

const { Schema } = mongoose;

const registerSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    }
});

// Create Collection (model) "Credential"
const Credential = mongoose.model('Credential', registerSchema);

// Export model
export default Credential;
