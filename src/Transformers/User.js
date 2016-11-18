const single = exports.single = user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  created_at: user.created_at.format(),
});

exports.collection = users => users.map(single);
