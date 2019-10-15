const express = require('express')

const router = express.Router()

router.get('/information', (req, res) => {
    res.status(200).json({message: 'this is private info'})
})

module.exports = router