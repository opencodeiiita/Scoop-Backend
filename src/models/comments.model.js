import {Schema, model} from "mongoose";

const commentSchema = new Schema({
    News:{
        type: Schema.Types.ObjectId,
        ref: 'News',
    },
    User:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    Date:{
        type: Date,
        default: Date.now,
    },
    Comment:{
        type: String,
        required: true,
    },
},
{timestamps: true}
);

const Comment = model("Comment", commentSchema);

export default Comment;