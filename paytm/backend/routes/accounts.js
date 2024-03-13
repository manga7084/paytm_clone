const express = require("express");
const { authenticate } = require("./auth");
const { z } = require("zod");
const { Accounts } = require("../db");

const router = express.Router();

const balanceTransferBody = z.object({
  to: z.string(),
  balance: z.number(),
});

router.get("/balance", authenticate, async (req, res) => {
  const userId = req.userId;
  const accountDetails = await Accounts.findOne({ userId: userId });
  res.status(200);
  return res.json({ balance: accountDetails.balance });
});

router.post("/transfer", authenticate, async (req, res) => {
  const { success } = balanceTransferBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "invalid body" });
  }

  const session = await mongoose.startSession();
  const { to, amount } = req.body;

  const userFrom = await Accounts.findOne({ userId: req.userId }).session(
    session
  );
  if (userFrom.balance < amount) {
    return res.status(400).json({ message: "insufficient balance" });
  } else {
    const userTo = await Accounts.findOne({ userId: to }).session();
    if (!userTo) {
      return res.status(400).json({ message: "invalid Account" });
    } else {
      await Accounts.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      ).session(session);
      await Accounts.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
      ).session(session);
      await session.commitTransaction();
    }
  }
  return res.status(200).json({ message: "transfer successful" });
});

module.exports = router;
