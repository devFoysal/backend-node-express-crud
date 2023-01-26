const dbConfig = require('../../../config/DatabaseConfig')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.DB_USER,
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: { ...dbConfig.pool }
    }
)

sequelize.authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err))

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./ProductModel')(sequelize, DataTypes)
db.reviews = require('./ReviewModel')(sequelize, DataTypes)

db.sequelize
    .sync({ force: false })
    .then(() => console.log(`Yes resync done!`))

module.exports = db