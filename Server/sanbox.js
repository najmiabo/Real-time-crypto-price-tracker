const WebSocket = require("ws")

const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

pricesWs.onmessage = function (msg) {
    const data = JSON.parse(msg.data)
    for (let oldKey in data) {
        if (data.hasOwnProperty(oldKey)) {
            // let value = data[oldKey];
            // delete data[oldKey];
            let newKey = oldKey.charAt(0).toUpperCase() + oldKey.slice(1);
            // console.log(newKey)
        }
    }
    console.log(data)
}