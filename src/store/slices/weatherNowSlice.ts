import {createSlice, PayloadAction, createAsyncThunk, Slice} from "@reduxjs/toolkit"
import { getWeatherFromLocalStorage, setWeatherToLocalStorage, alertError, getNewCity} from '../actions/weatherNowActions';

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

export interface SliceState  {
    cities: Weather[],
    isLoading: boolean
    error: string | undefined
}

const initialState: SliceState = {
    cities: getWeatherFromLocalStorage(),
    isLoading: false,
    error: '',
}

export const weatherNowSlice = createSlice({
    name: 'weatherNow',
    initialState,
    reducers: {
        removeCity: (state, action: PayloadAction<string>) => {
            state.cities = state.cities.filter(c => c.location.name !== action.payload);
            setWeatherToLocalStorage(state.cities)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNewCity.pending, (state) => {
            state.isLoading = true;
            state.error = ''
        })
        builder.addCase(getNewCity.rejected, (state, action) => {
            state.isLoading = false;
            const eMsg = action.payload;
            alertError(state, eMsg)
        })
        builder.addCase(getNewCity.fulfilled, (state, action) => {
            if (state.cities.find(c => c.location.name === action.payload.location.name)) {
                state.isLoading = false;
                const eMsg = 'This city is already in the list'
                alertError(state, eMsg)
            } else {
                state.isLoading = false;
                state.cities.push(action.payload);
                setWeatherToLocalStorage(state.cities)
            }
        })
    }
})


export const {removeCity} = weatherNowSlice.actions
export default weatherNowSlice.reducer;