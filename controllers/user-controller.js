const { User } = require('../models');


const userController = {
    // get all Users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one User by id
    getUserbyId(req, res) {
        User.findOne({ _id: req.params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new User
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a user by id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}



module.exports = userController;