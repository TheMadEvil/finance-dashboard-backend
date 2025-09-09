const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // your existing auth middleware
const Finance = require("../models/Finance");

// POST /api/finance/add
router.post("/add", auth, async (req, res) => {
  const { type, amount, description, date } = req.body;

  try {
    const finance = new Finance({
      user: req.user.id,
      type,
      amount,
      description,
      date,
    });

    await finance.save();
    res.json(finance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
