const {schema, model} = require('mongoose');

const users = new schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/]
    },
    thoughts:[ {
        type: schema.Types.ObjectId,
        ref: 'Thought'
    }],

    friends:[ {
        type: schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON:{
        virtuals: true
    },
    id: false
}
);

User.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', users);

module.exports = User;