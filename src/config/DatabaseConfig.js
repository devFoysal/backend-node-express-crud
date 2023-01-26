module.exports = {
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASSWORD: '',
    DB_NAME: 'node_crud',
    dialect: 'mysql',
    pool:{
        min:0,
        max:5,
        acquire: 30000,
        idle: 10000
    }
}