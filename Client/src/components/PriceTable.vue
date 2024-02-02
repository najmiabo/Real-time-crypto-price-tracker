<script>
import { mapState, mapActions } from 'pinia'
import { useCryptoStore } from '@/stores/crypto'
import Swal from 'sweetalert2'
import { io } from 'socket.io-client'
export default {
    data() {
        return {
            latestPrice: [],
            assetToShow: 15,
            socket: {},
            search: ""
        }
    },
    created() {
        this.socket = io('http://localhost:4000')
    },
    computed: {
        ...mapState(useCryptoStore, ['isLogin']),
        filteredAsset: () => {
            return this.latestPrice.filter((el) => {
                return el.rawName.match(this.search)
            })
        }
    },
    methods: {
        calculatePercentage(currentPrice, lastPrice) {
            const change = currentPrice - lastPrice;
            const percentage = (change / lastPrice) * 100
            return percentage.toFixed(2)
        },
        getTextColor(number) {
            return number < 0 ? "text-danger" : "text-success"
        },
        getUpDown(number) {
            return number < 0 ? "fas fa-caret-down" : "fas fa-caret-up"
        },
        ...mapActions(useCryptoStore, ['addWatchList']),
        handleClick(id) {
            if (this.isLogin) {
                this.addWatchList(id)
            } else {
                Swal.fire("Please login first");
            }
        }
    },
    mounted() {
        this.socket.on("cryptos", (data) => {
            if (this.search) {
                this.latestPrice = data.filter((el) => {
                    return el.rawName.match(this.search)
                })
            } else {
                this.latestPrice = data
            }
        })
    }
}
</script>
<template>
    <div class="container">
        <div class="input-group rounded mb-3">
            <input v-model="search" type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                aria-describedby="search-addon" />
            <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
            </span>
        </div>
        <table class="table table-hover text-nowrap border shadow-lg p-4 mb-2">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Name</th>
                    <th scope="col" class="text-center">Price(USD)</th>
                    <th scope="col" class="text-center">Change</th>
                    <th scope="col" class="text-center">Change Percentage</th>
                    <th scope="col" class="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="latestPrice.length != 0" v-for="asset in latestPrice.slice(0, assetToShow)" :key="asset.id">
                    <td class="text-center">
                        <span class="fs-6">
                            <span>{{ asset?.coinName }}</span>
                        </span>
                    </td>
                    <td class="text-center">
                        <span class="fs-6">
                            <span>$ {{ asset?.currentPrice }}</span>
                        </span>
                    </td>
                    <td class="text-center">
                        <span class="fs-6" :class="getTextColor(asset?.currentPrice -
                            asset?.lastPrice)">
                            <i class="me-1" :class="getUpDown(asset?.currentPrice -
                                asset?.lastPrice)"></i><span>{{ asset?.currentPrice -
        asset?.lastPrice }}</span>
                        </span>
                    </td>
                    <td class="text-center">
                        <span class="fs-6" :class="getTextColor(asset?.currentPrice - asset?.lastPrice)">
                            <i class="me-1" :class="getUpDown(asset?.currentPrice -
                                asset?.lastPrice)"></i><span>{{
        calculatePercentage(asset?.currentPrice,
            asset?.lastPrice) }}%</span>
                        </span>
                    </td>
                    <td class="text-center">
                        <button @click="handleClick(asset?.id)" class="btn btn-primary fs-6">Add to
                            WatchList</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="latestPrice.length == 0" class="d-flex justify-content-center">
            <div class="spinner-grow" role="status"></div>
            <div class="spinner-grow" role="status"></div>
            <div class="spinner-grow" role="status"></div>
            <div class="spinner-grow" role="status"></div>
        </div>
        <div v-if="assetToShow < latestPrice.length" class="d-flex justify-content-center">
            <button @click="assetToShow += 15" class="btn btn-success">Load more...</button>
        </div>
    </div>
</template>

<style></style>