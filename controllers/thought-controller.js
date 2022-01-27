const {user, thought} = require('../models');

const thoughtControl = {
    getAllThought(req, res) {
        thought.find({})
        .populate({
            path: 'reactions',
            select: '-__V'
        })
        .select('-__V')
        .sort({_id: -1})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    getThoughtId(req, res) {
        thought.findOne({_id: URLSearchParmas.id })
        .populate({
            path: 'reactions',
            select: '-__V'
        })
        .select('-__V')
        .sort({_id: -1})
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: "No thoughts found."});
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createReaction({parmas, body}, res){
        thought.findOneAndUpdate(
            {_id: parmas.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .populate({path: 'reactions', select: '-__V'})
        .select('-__V')
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No thoughts.'});
            return;
            }
            res.json(dbData);
        })
        .catch(err => res.status(400).json(err))
    },

    deleteReaction({parmas}, res){
        thought.findOneAndUpdate(
            {_id: parmas.thoughtId},
            {$pull: {reactions: {reactionId: parmas.reactionId}}},
            {new: true}
        )
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'None.'});
            return;
            }
            res.json(dbData);
        })
        .catch(err => res.json(err))
    },



    createThought({body}, res) {
        thought.create(body)
        .then(({_id}) => {
            return user.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );

        })
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: "No user found."});
                return;
            }
            res.json(dbData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({parmas}, res) {
        thought.findOneAndDelete({_id: parmas.id})
        .then(dbData => {
            if (!dbData){
            res.status(404).json({message: "No thoughts found with this id."});
            return;
        }
        return user.findOneAndUpdate(
            { _id: parmas.userId },
            { $pull: {thoughts: parmas.Id} },
            { new: true}
        )
    })
        .then(dbUser => {
            if (!dbUser) {
                res.status(404).json({message: "No user found."});
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    },


};

module.exports = thoughtControl;