import {createPinia} from "pinia";
import {defineStore} from "pinia";

export default createPinia()

export const Store = defineStore('store',{
    state: () => {
        return {
            api_url: 'https://b0c5-109-252-171-147.ngrok-free.app/api',
        }
    },
    getters: {
        getAPI: state => {
            return state.api_url
        }
    }
})