const express = require("express");
const router = express.Router();

//Comment routes
router.get("/:videoId", comments)
router.edit("/commentId", editComments)
router.delete("/:delete", deleteUser)


module.exports = router