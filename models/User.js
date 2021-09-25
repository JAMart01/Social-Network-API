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
            
        }
    }
)