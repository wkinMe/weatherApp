import {SliceState, Weather} from "../slices/weatherNowSlice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { getCurrentWeather } from "../../api/currentWeather"

export const getNewCity = createAsyncThunk<Weather, string, {state: RootState, rejectValue: string}>(
    'weatherNow/fetchCity',
    async (city: string, {rejectWithValue}) => {
        try {
            const response = await getCurrentWeather(city)
            return response
        } catch (e: any) {
            return rejectWithValue("We can't find info about this city")
        }
    }
)

export const alertError = (state: SliceState, msg: string | undefined) => {
    state.error = msg
}

export const getWeatherFromLocalStorage:() => Weather[] = () => {
    try {
        const cities = localStorage.getItem("cities");
        if (cities === null) return []
        return JSON.parse(cities)
    } catch (e: any) {
        return []
    }
}

export const setWeatherToLocalStorage: (cities: Weather[]) => void = (cities) => {
    try {
        localStorage.setItem("cities", JSON.stringify(cities))
    } catch(e) {
        console.warn(e)
    }
}