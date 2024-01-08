module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    }
  }
  // You can define configurations for other environments like 'production' or 'test' here.
};
