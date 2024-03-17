import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        console.log('Error getting chat', error)
    }
})

export default router