const { sequelize } = require('/db/models'); 

sequelize.showALLSchemas({logging: false }).then(async (data) => {

if (!data.includes(proces.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA); 
}
}); 