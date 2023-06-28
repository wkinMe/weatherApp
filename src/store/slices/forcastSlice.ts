import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';
import { getNewForecast } from '../actions/forecastActions';

export interface ForecastWeather {
    location: Location;
    forecast: Forecast;
}
export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}
export interface Forecast {
  forecastday: Forecastday[];
}
export interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
}
export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}
export interface Condition {
  text: string;
  icon: string;
  code: number;
}
export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
  is_moon_up: number;
  is_sun_up: number;
}

interface initialState {
    weather: ForecastWeather,
    error: string | undefined,
    isLoading: boolean,
}

const initialState: initialState = {
    weather: {} as ForecastWeather,
    error: '',
    isLoading: false,
}

export const forecastSlice = createSlice({
    name: `forecast`,
    initialState,
    reducers: {
      clearForecast: (state) => {
        state.weather = {} as ForecastWeather
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getNewForecast.pending, (state) => {
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(getNewForecast.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(getNewForecast.fulfilled, (state, action) => {
          state.isLoading = false
          state.weather = action.payload
        })
    }
})

export const {clearForecast} = forecastSlice.actions
export default forecastSlice.reducer