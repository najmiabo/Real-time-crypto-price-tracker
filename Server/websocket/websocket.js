const WebSocket = require("ws")
const { Crypto } = require("../models")

const coinCapSocket = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');

coinCapSocket.on("open", () => {
    console.log('Connected to coincap.io WebSocket')
})

coinCapSocket.onmessage = async (event) => {
    try {
        const data = JSON.parse(event.data);

        for (let asset in data) {
            if (typeof data[asset] == "string") {
                data[asset] = +data[asset]
            }
            // console.log(data[asset])
            let newKey = asset.charAt(0).toUpperCase() + asset.slice(1);
            const priceData = {
                rawName: asset,
                coinName: newKey,
                lastPrice: 0,
                currentPrice: data[asset],
            };

            const existingPrice = await Crypto.findOne({ where: { rawName: asset } })
            // console.log(existingPrice)
            if (existingPrice) {
                priceData.lastPrice = existingPrice.currentPrice;
                await Crypto.update(priceData, { where: { rawName: asset } })
            } else {
                await Crypto.create(priceData)
            }
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports = { coinCapSocket }