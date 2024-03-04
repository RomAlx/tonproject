import {createPinia} from "pinia";
import {defineStore} from "pinia";

export default createPinia()

export const Store = defineStore('store', {
    state: () => {
        return {
            api_url: 'https://ideally-apparent-newt.ngrok-free.app/api',
            // api_url: 'http://localhost/api',
            user: null,
        }
    },
    getters: {
        getAPI: state => {
            return state.api_url
        },
        getUser: state => {
            return state.user
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
        }
    }
})