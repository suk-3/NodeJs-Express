const functionality = (req, res) => {
  const response = {};
  response.message = 'API Healthy';
  res.json(response);
};

module.exports = {
  functionality,
};
