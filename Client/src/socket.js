import { io } from 'socket.io-client'
import { reactive } from 'vue'

export const state = reactive({
    latestPrice: []
})

export const socket = io('http://localhost:4000')

socket.on("latestPrice", (data) => {
    state.latestPrice = data
})

console.log(state)