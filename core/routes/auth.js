import { express } from "express";
import { User } from "../models/user";
import { body, validationResult } from "express-validator";
import { bcrypt } from "bcryptjs";
import { jwt } from "jsonwebtoken";
import { fetchUser } from "../middleware/fetch_user";
import { JWT_SECRET } from "../const";

const router = express.Router();

// Route 1: Create a user using :Route '/api/auth/create'. Doesn't require Authentication
router.post(
  "/create",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Email not valid").isEmail(),
    body("password", "Password must be atleast 8 characters long").isLength({
      min: 8,
    }),
  ],

  async (rq, res) => {
    let success = false;

    // If there are error, Return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Check whether a user with same email address exists
    try {
      let user = await user.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          error: "User with this email already exists.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      hashed_password = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashed_password,
      });

      let data = {
        user: user.id,
      };

      success = true;

      const auth_token = jwt.sign(data, JWT_SECRET);
      res.json({ success, auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// Route 2: Authenticate a user using :Post '/api/auth/login'. Doesn't require Authentication.
router.post(
  "/login",
  [
    body("email", "Email not valid").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    // If there are error, Return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await user.findONe({ email });

      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const password_compare = await bcrypt.compare(password, user.password);

      if (!password_compare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      let data = {
        user: {
          id: user.id,
        },
      };

      const auth_token = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({
        success,
        auth_token,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// Route 3: Get logged in user details using :Post '/api/auth/get'. Authentication required.
router.post("/get", fetchUser, async (req, res) => {
  try {
    var user_id = req.user.id;
    const user = await user.findById(user_id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
});

module.exports = router;
