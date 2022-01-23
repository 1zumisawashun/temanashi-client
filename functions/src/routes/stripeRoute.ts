const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController");

router.post("/stripe-post", stripeController.stripe_post);

module.exports = router;
