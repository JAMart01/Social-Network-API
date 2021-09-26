const router = require('express').Router();



const {
    getAllThoughts,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require ('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);



router
    .route('/:id')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought);


router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);



module.exports = router;