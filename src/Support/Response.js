module.exports = (status, body) => ({
  status,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
});
