<script>
import { mapActions } from 'pinia';
import { useCryptoStore } from '../stores/crypto'
export default {
    props: ['list'],
    methods: {
        ...mapActions(useCryptoStore, ['deleteWatchList']),
        handleClick(id) {
            this.deleteWatchList(id)
        }
    }
}
</script>

<template>
    <div class="col-xl-6 col-lg-6">
        <div class="card l-bg-cherry">
            <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                <div class="mb-4">
                    <h5 class="card-title mb-0">{{ list.Crypto.coinName }}</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                    <div class="col-8">
                        <h2 class="d-flex align-items-center mb-0">
                            $ {{ list.Crypto.currentPrice }}
                        </h2>
                    </div>
                    <div class="col-4 text-right">
                        <span>Last Price: {{ list.Crypto.lastPrice }}</span>
                    </div>
                    <div class="mt-3">
                        <button @click="handleClick(list.id)" class="btn btn-danger">delete</button>
                    </div>
                </div>
                <!-- <div class="progress mt-1 " data-height="8" style="height: 8px;">
                    <div class="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100" style="width: 25%;"></div>
                </div> -->
            </div>
        </div>
    </div>
</template>