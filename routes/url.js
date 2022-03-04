const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../models/url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = "http://localhost:3000";

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid Base Url");
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl: longUrl });
      if (url) {
        res.redirect("/");
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.redirect("/");
      }
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  } else {
    return res.status(401).json("Invalid long Url");
  }
});

module.exports = router;
