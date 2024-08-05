module.exports = {
  port: 3000, // Default port
  corsOptions: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },
};
