import axios from 'axios'

export const instance = axios.create({
    baseURL: `http://api.weatherapi.com/v1`,
    params: {
        "key": "3499e15480484e318cc175644230306"
    }
})