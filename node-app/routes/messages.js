const express = require('express');
const { MessagesServices } = require('../services/messagesApi');

function messagesApi(app) {
    const router = express.Router();
    app.use('/api/messages/', router);

    const messagesService = new MessagesServices();

    router.get('/', async(req, res) => {
        const messages = await messagesService.getAll();
        res.status(200).json({
            data: messages,
            message: 'Messages retrieved successfully',
        });
    });
}

module.exports = {
    messagesApi,
};