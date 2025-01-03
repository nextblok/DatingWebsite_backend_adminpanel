module.exports = {
  port: process.env.PORT || 8000,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb://localhost/matematch',
    test: 'mongodb://localhost/stackoverflow-test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  }
};
