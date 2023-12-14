import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
        unique: true,
    },
    ProfileImage: {
        type: String,
        default: '',
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    myUpvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    News: [{
        type: Schema.Types.ObjectId,
        ref: 'News'
    }],
},
{timestamps: true }
);

const User = model('User', userSchema);

export default User;


