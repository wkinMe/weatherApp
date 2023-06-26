import { ForecastWeather } from './../store/slices/forcastSlice';
import { Weather } from './../store/slices/weatherNowSlice';
import { instance } from './base';

export const getCurrentWeather = (city: string) => {
    return instance.get("/current.json", {params: {q: city}}).then<Weather>(res => res.data)
}

export const getForecast = (city: string) => {
    return instance.get(`/forecast.json`, {params: {q: city, days: 7}}).then<ForecastWeather>(res => res.data)
}