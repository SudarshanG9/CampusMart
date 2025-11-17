router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    const items = await Item.find({ store: req.params.id }); // This is the key line
    res.json({ store, items });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});