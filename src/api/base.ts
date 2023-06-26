import axios from 'axios'

export const instance = axios.create({
    baseURL: `http://api.weatherapi.com/v1`,
    params: {
        "key": "756dd920e30543d7b02161001231306"
    }
})