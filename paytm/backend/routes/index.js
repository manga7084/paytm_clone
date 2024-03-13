const express = require("express");

const userRouter = require("./user");
const accountRouter = require("./accounts");

const router = express.Router();

// app.use(router);    // it is wrong here as we already written router.use.

//router.get("/api/v1", async (req, res, next) => {});
router.use("/user", userRouter);
router.use("/accounts", accountRouter);

module.exports = router;
