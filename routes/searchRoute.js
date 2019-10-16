const express = require("express");
const router = express.Router();
const search = require("../services/search");

router.get("/:q", async (req, res) => {
  const result = await search.run(req.params.q);
  res.send(result);
});

module.exports = router;
