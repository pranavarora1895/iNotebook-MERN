const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Create a User using: POST "/api/auth/". Doesn't requires auth. No login required
const JWT_SECRET = "beerwhiskeyrumvodka";
router.post(
  "/createuser",
  [
    body("name", "Name should atleast 3 characters long.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password should atleast 5 characters long.").isLength({
      min: 5,
    }),
  ], // Express Validator package used
  // If there are errors, return Bad Request and errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether email of user exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists." });
      }
      // User created
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      // Catch errors
      console.error(error);
      res.status(500).send("Some error occured!!");
    }
  }
);

module.exports = router;
