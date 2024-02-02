<script>
import Navbar from "./components/Navbar.vue"
import { mapWritableState } from "pinia";
import { useCryptoStore } from "./stores/crypto";
export default {
    components: {
        Navbar
    },
    computed: {
        ...mapWritableState(useCryptoStore, ['isLogin'])
    },
    created() {
        const access_token = localStorage.access_token
        if (access_token) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    }
}
</script>

<template>
    <Navbar />

    <RouterView />
</template>
