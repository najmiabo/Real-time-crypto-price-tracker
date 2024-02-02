<script>
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import { useCryptoStore } from '@/stores/crypto';

export default {
    computed: {
        ...mapState(useCryptoStore, ['isLogin', 'isLogin'])
    },
    methods: {
        ...mapActions(useCryptoStore, ['handleLogout'])
    }
}
</script>

<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand fs-3" href="#">CoinTracker<i class="fab fa-bitcoin"></i></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link active fs-6" to="/">Home</router-link>
                        </li>
                        <li class="nav-item" v-if="isLogin">
                            <router-link tag="button" class="nav-link active fs-6" to="/watch-list">Watch
                                List</router-link>
                        </li>
                        <li class="nav-item" v-if="!isLogin">
                            <router-link class="nav-link active fs-6" to="/register">Register</router-link>
                        </li>
                        <li class="nav-item" v-if="!isLogin">
                            <router-link class="nav-link active fs-6" to="/login">Login</router-link>
                        </li>
                        <li class="nav-item" v-if="isLogin">
                            <button @click="handleLogout" class="nav-link active fs-6">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>