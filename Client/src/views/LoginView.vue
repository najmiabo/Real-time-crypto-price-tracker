<script>
import { mapActions } from 'pinia';
import { useCryptoStore } from '../stores/crypto'
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        ...mapActions(useCryptoStore, ['handleLogin']),
        handleSubmit() {
            this.handleLogin(this.form);
        }
    },
    components: { RouterLink }
}
</script>

<template>
    <div class="container w-25 mt-5">
        <div class="d-flex justify-content-center border shadow p-5">
            <div>
                <h1 class="mb-3 text-center">Login</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="form.email">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <p class="text-start mt-4">Don't have an account? <RouterLink to="/register">click here...</RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>