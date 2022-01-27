const {user, thought} = require('../models');

const userControl = {
    getAllUser(req, res) {
        user.find({})
        .select('-__V')
        .sort({_id: -1})
        .then(dbUser => res.json(dbUser))
        .catch(err => {
            console.log(err);
            res.sendStatus;
        });
    },
    
    getUserId({parmas}, res) {
        user.findOne({_id: parmas.id})
        .populate({
            path: 'thoughts',
            select: '-__V'
        })
        .populate({
            path: 'friends',
            select: '-__V'
        })
        .then(dbUser => {
            if(!dbUser) {
                res.status(404).json({ message: 'No User found.' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },

    deleteUser({parmas}, res) {
        thought.deleteMany({userId: parmas.id})
        .then(() => {
            user.findOneAndDelete({ userId: parmas.id})
            .then(dbUser => {
                if(!dbUser){
                    res.status(404).json({ message: 'No User found. ' });
                    return;
                }
            })
        })
    },

    updateUser({parmas, body}, res){
        user.findOneAndUpdate({_id: parmas.id}, body, {new: true, runValidators: true})
        .the(dbUser => {
            if(!dbUser){
                res.status(404).json({ message: 'No User found.' });
                return;
            }
            res.json(dbUser);
        })
        .catch(err => res.json(err));
    },

    createUser({parmas, body}, res){
        user.create(body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.json(err));
    },

    addFriends({parmas},res){
        user.findOneAndUpdate(
            {_id: parmas.userId},
            {$push: {friends: parmas.friendId}},
            {new: true}
        )
        .then((dbUser) => {
            if(!dbUser){
                res.status(404).json({ message: 'No User found ' });
                return;
            }
            res.json(dbUser);
        })
        .catch((err) => res.status(400).json(err));
    },

    deleteFriends({parmas},res){
        user.findOneAndUpdate(
            {_id: parmas.userId},
            {$pull: {friends: parmas.friendId}},
            {new: true}
        )
        .then((dbUser) => {
            if(!dbUser){
                res.status(404).json({ message: 'No User found ' });
                return;
            }
            res.json(dbUser);
        })
        .catch((err) => res.status(400).json(err));
    }



}

module.exports = userControl;