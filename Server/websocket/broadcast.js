const { Server: WebSocketServer } = require('socket.io')
const { Crypto } = require("../models");
const { server } = require('../app');

const wss = new WebSocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

setInterval(async () => {
    try {
        const cryptos = await Crypto.findAll({
            order: [
                ['currentPrice', 'DESC']
            ]
        })

        wss.emit("cryptos", cryptos)

    } catch (err) {
        console.error("err: ", err)
    }
}, 2000)