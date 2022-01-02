import {Pool} from 'pg'


export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "myApp",
    password: "123456",
    port: 5432,
}) 