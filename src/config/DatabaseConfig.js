module.exports = {
    DB_HOST: 'localhost',
    DB_USER: 'foysalmahmud',
    DB_PASSWORD: 'password',
    DB_NAME: 'crud',
    dialect: 'mysql',
    pool:{
        min:0,
        max:5,
        acquire: 30000,
        idle: 10000
    }
}