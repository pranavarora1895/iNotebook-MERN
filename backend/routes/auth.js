const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "beerwhiskeyrumvodka";
const fetchUser = require("../middleware/fetchuser");
// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't requires auth. No login required
router.post(
  "/createuser",
  [
    body("name", "Name should atleast 3 characters long.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password should atleast 5 characters long.").isLength({
      min: 5,
    }),
  ], // Express Validator package used
  async (req, res) => {
    // If there are errors, return Bad Request and errors
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
      res.status(500).send("Internal Server Error!!");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(), // Express Validator package used
    body("password", "Password cannot be blank.").exists(),
  ], // Express Validator package used
  async (req, res) => {
    // If there are errors, return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Login with correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Login with correct credentials." });
      }
      // If all checks passed, send the auth token payload built out of user's id.
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error!!");
    }
  }
);

// ROUTE 3: Get logged in User detail: POST "/api/auth/getuser". Login required.
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error!!");
  }
});
module.exports = router;
