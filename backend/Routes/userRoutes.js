const { signup, login, setavatar, getAllUsers } = require("../Controllers/usersController");

const router = require("express").Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/setavatar/:id',setavatar)
router.get('/allusers/:id',getAllUsers)

// console.log("i am a userRouters");

module.exports = router;