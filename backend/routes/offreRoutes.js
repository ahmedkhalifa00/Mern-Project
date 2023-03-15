const express = require('express')
const router = express.Router()
const {
    getOffres,
    setOffre,
    updateOffre,
    deleteOffre
} = require('../controllers/offreController')

router.route('/').get(getOffres).post(setOffre)

router.route('/:id').put(updateOffre).delete(deleteOffre)

module.exports = router