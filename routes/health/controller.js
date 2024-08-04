const functionality = (req, res) => {
    response = {}
    response["message"] = "API Healthy"
    res.json(response);
};

module.exports = {
    functionality
};
