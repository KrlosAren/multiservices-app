const express = require('express');
const { MessagesServices } = require('../services/messagesApi');
const axios = require('axios');
const { fecthApi } = require('../utils/fetch');

function messagesApi(app) {
    const router = express.Router();
    app.use('/api/messages/', router);

    const messagesService = new MessagesServices();

    router.get('/', async(req, res) => {
        const auth = req.headers.authorization || '';
        const resp = await fecthApi({
            url: 'http://django:8000/api/messages/',
            method: 'get',
            body: {},
        });
        // console.log(resp);
        // const messages = await messagesService.getAll();
        res.status(200).json({
            messages: resp,
            message: 'Messages retrieved successfully',
        });
    });
}

module.exports = {
    messagesApi,
};