import { DataSource } from "typeorm"

export default new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "raouf..123",
    database: "auth_system",
    entities: [
        'dist/**/*.entity.js'
    ],
    migrations: [
        './dist/migrations/*.js'
    ],
})