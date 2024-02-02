const Controller = require("../controllers/controller")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)

router.post('/assets/:cryptoId', Controller.addWatchList)
router.get('/watch-lists', Controller.watchLists)
router.delete('/watch-lists/:id', Controller.deleteWatchLists)

module.exports = router