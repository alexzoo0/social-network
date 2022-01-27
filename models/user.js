const {schema, model} = require('mongoose');
const moment = require('moment');

const user = new schema({
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
        type: schema.types.objectId,
        ref: 'Thought'
    }]
},
{
    toJSON:{
        virtuals: true
    },
    id: false
}
);

user.virtual('friendCount').get(function () {
    return this.friends.length;
});

const user = model('user', user);

module.exports = user;