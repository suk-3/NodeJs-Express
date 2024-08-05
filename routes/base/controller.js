const functionality = (req, res) => {
  const response = {};
  response.message = 'This is boilerplate code for NodeJS';
  res.json(response);
};

module.exports = {
  functionality,
};
