const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
});

class Database {
    constructor() {
        this.client = pool;
    }

    connect() {
        if (!Database.connection) {
            Database.connection = new Promise((resolve, reject) => {
                this.client.connect((err) => {
                    if (err) {
                        console.log('error to conect to database');
                        console.log(err.stack);
                        reject(err);
                    }
                    console.log('Connected to database');
                    resolve(this.client.connect());
                });
            });
        }
        return Database.connection;
    }

    async disconnect() {
        await this.client.end();
    }

    db(query) {
        return this.connect().then((db) => {
            return db.query(query).then((result) => {
                return result.rows;
            });
        });
    }
}

module.exports = {
    Database,
};