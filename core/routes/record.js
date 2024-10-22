import { express } from "express";
import { fetchUser } from "../middleware/fetch_user";
import { Record } from "../models/record";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Route 1: Get all the entries of logged in user :Get '/api/record/fetch'. Authentication required.
router.get("/fetch", fetchUser, async (req, res) => {
  const records = await Record.find({ user: req.user.id });
  res.json(records);
});

// Route 2: Add a record :Post '/api/record/add'. Authentication required
router.post(
  "/add",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("data", "Enter valid text").isLength({ min: 5 }),
    body("tag", "Enter a tag").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      // If there are error, Return bad request and the errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const record = new Record({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id,
      });

      const saved_record = await record.save();

      res.json(saved_record);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

// Route 3: Update an existing record :PUT '/api/record/update'. Authentication required.
router.put("/update/:id", fetchUser, async (req, res) => {
  const { title, data, tag } = req.body;

  try {
    const new_record = {};

    if (title) {
      new_record.title = title;
    }

    if (data) {
      new_record.data = data;
    }

    if (tag) {
      new_record.tag = tag;
    }

    // Find the entry to be updated
    let record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).send("Not found");
    }

    if (record.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    record = await Record.findByIdAndUpdate(
      req.params.id,
      { $set: new_record },
      { new: true }
    );

    res.json({ record });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
});

// Route 4: Delete an existing record :DELETE '/api/record/delete'. Authentication required.
router.delete("/delete", fetchUser, async (req, res) => {
  try {
    // Find the entry to be deleted
    let record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).send("Not found");
    }

    if (record.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    record = await Record.findByIdAndDelete(req.params.id);
    res.json({ record });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured.");
  }
});

module.exports = router;
