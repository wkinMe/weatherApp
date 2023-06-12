import { Weather } from './../store/slices/weatherNowSlice';
import { instance } from './base';

export const getCurrentWeather = (city: string) => {
    return instance.get("/current.json", {params: {q: city}}).then<Weather>(res => res.data)
}