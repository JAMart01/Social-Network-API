const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String, 
            required: 'Please add something to your reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Every reaction needs a user to create it! So who created this one?'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdVal) => dateFormat(createdVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You can\'t have an empty Thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdVal) => dateFormat(createdVal)
        },
        username: {
            type: String,
            required: 'Every thought needs a user to create it! So who created this one?'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true
        },
        id: false
    }
)


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length + 1;
});


const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;