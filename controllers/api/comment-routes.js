router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "text", "user_id", "post_id", "created_at"],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
