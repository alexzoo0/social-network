const { schema, model, types} = require('mongoose');
const moment = require('moment');

const reaction = new schema({
    reactionId: {
        type: schema.types.objectId,
        default: () => new types.objectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const thoughtSchema = new schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        tpe: String,
        required: true
    },
    reactions: [reaction]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const thought = model('thought', thoughtSchema);

module.exports = thought;
