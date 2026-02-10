const app = require("express");
const { showLeader } = require("../controller/showLeader.controller");
const  router = app.Router();

router.get("/",showLeader)




module.exports = router