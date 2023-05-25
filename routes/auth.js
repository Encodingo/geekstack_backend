const {
  login,
  register,
  getAllUsers,
  makeUserAdmin
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login); 
router.post("/register", register);
router.post("/makeadmin", makeUserAdmin);
router.get("/allusers", getAllUsers);

// router.get("/logout/:id", logOut);

module.exports = router;
