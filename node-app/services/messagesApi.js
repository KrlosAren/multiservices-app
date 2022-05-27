const { Database } = require('../database');

class MessagesServices {
    constructor() {
        this.table = 'notifications_message';
        this.database = new Database();
    }

    async getAll() {
        const query = `SELECT * FROM ${this.table}`;
        console.log(query);
        const result = await this.database.db(query);
        return result;
    }
}

module.exports = {
    MessagesServices,
};