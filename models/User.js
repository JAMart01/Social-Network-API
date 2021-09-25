const { Schema, model } = require('mongoose');



const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true, 
            required: 'You need to provide a username in order to create a User!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'You need to provide an email in order to create a User!',
            // I found this regex on Stack Overflow from a user named ramon22
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length + 1;
});


const User = model('User', UserSchema);



module.exports = User;