const express = require("express");

const router = express.Router();

const {handleGetAllUsers,handleGetUserById,handleEditUserById,handleDeleteUserById,handleCreateUser} = require("../controllers/user");



//Routes
router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);


router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleEditUserById)
    .delete(handleDeleteUserById);



module.exports = router;
