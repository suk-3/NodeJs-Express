const middleware = (req, res, next) => {
    console.log('This middleware runs on every request');
    // Logic for auth , tokenisation and can be done here.
    next();
};

module.exports = middleware;
