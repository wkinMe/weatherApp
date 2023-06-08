import { Weather } from './../store/slices/weatherNowSlice';
import axios from 'axios';
import { instance } from './base';

export const getCurrentWheather = (city: string) => {
    return instance.get("/current.json", {params: {q: city}}).then<Weather>(res => res.data)
}