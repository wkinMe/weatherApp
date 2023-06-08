import { AppDispatch } from './../../store/store';
import {createSlice, PayloadAction, CaseReducer} from "@reduxjs/toolkit"
import { getCurrentWheather } from '../../api/currentWeather';

export interface Weather {
    location: Location;
    current: Current;
  }
  interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  }
  interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  }
  interface Condition {
    text: string;
    icon: string;
    code: number;
  }

interface SliceState  {
    cities: Weather[]
    isLoading: boolean
    error: string
}

const initialState: SliceState = {
    cities: [],
    isLoading: false,
    error: '',
}

export const getCity = (city: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchWeatherInfo())
        const newCityWeather = await getCurrentWheather(city)
        dispatch(addNewCity(newCityWeather))
    } catch (e: any) {
        dispatch(fetchError(e.message))
    }
}

export const weatherNowSlice = createSlice({
    name: 'weatherNow',
    initialState,
    reducers: {
        addNewCity: (state: SliceState, action: PayloadAction<Weather>) => {
            state.isLoading = false
            state.cities.push(action.payload)
        },
        fetchWeatherInfo: (state: SliceState) => {
            state.isLoading = true
            state.error = ''
        },
        fetchError: (state: SliceState, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

const {addNewCity, fetchWeatherInfo, fetchError} = weatherNowSlice.actions

export default weatherNowSlice.reducer