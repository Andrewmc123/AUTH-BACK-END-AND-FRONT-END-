const config = require('./index'); 

module.exports = {
  development: { 
    storage: config.dbFile, 
    dialect: "sqlite", 
    seederStorage: "sequelize", 
    logQueryParameters: true, 
    typeValidation: true 
  },
  prodution: { 
    use_env_varible: 'DATABASE_URL', 
    dialect: 'postgres', 
    seederStorage: 'sequelize', 
    dialectOptions: { 
       ssl: {
        require: true, 
        rejectUnauthorized: false 
       }
    }, 
    define: {
      schema:process.env.SCHEMA
    }
  }
};