import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import axios from 'axios'

export const useCryptoStore = defineStore('crypto', {
    state: () => ({
        baseUrl: 'http://localhost:4000',
        dataCryptos: [],
        isLogin: false,
        watchLists: []
    }),
    actions: {
        swal(icon, title, text) {
            Swal.fire({
                icon,
                title,
                text,
                showConfirmButton: false,
                timer: 1500
            })
        },
        async handleRegister(form) {
            try {
                const { data } = await axios.post(this.baseUrl + "/register", form)
                console.log(data)
                this.$router.push("/login")
                this.swal("success", "Success", data.message)
            } catch (err) {
                console.log(err)
                this.swal("error", "Oops", err.response.data.message)
            }
        },
        async handleLogin(form) {
            try {
                const { data } = await axios.post(this.baseUrl + "/login", form)
                localStorage.setItem("access_token", data.access_token)
                this.isLogin = true
                this.$router.push("/")
                this.swal("success", "Success", "Login Success")
            } catch (err) {
                console.log(err)
                this.swal("error", "Oops", err.response.data.message)
            }
        },
        async handleLogout() {
            localStorage.clear()
            this.isLogin = false
            this.$router.push('/')
            this.swal("success", "Success", "Success Logout")
        },
        async addWatchList(id) {
            try {
                console.log(id)
                const { data } = await axios({
                    method: "POST",
                    url: this.baseUrl + "/assets/" + id,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.$router.push("/watch-list")
                this.swal("success", "Success", data.message)
            } catch (err) {
                console.log(err)
                this.swal("error", "Oops", err.response.data.message)
            }
        },
        async fetchWatchLists() {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: this.baseUrl + "/watch-lists",
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.watchLists = data
            } catch (err) {
                this.swal("error", "Oops", err.response.data.message)
            }
        },
        async deleteWatchList(id) {
            try {
                const { data } = await axios.delete(this.baseUrl + "/watch-lists/" + id, {
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                await this.fetchWatchLists()
                this.swal("success", "Success", data.message)
            } catch (err) {
                this.swal("error", "Oops", err.response.data.message)
            }
        }
    }
})
