const { Thought, User } = require('../models');



const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtbyId(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought(req, res) {
        Thought.create( req.body )
            .then(dbThoughtData => {
                User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: dbThoughtData._id } }, { new: true} )
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                return User.findOneAndUpdate({ _id: req.params.username }, {$pull: { thoughts: req.params.thoughtId }}, { new: true})
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$pull: {reactions: { reactionId: req.body.reactionId } } }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

}



module.exports = thoughtController;