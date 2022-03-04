const express = require("express");
const router = express.Router();

const Url = require("../models/url");

router.get("/", async (req, res) => {
  try {
    const url = await Url.find();

    if (url) {
      res.render("index", { shortUrls: url });
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;
