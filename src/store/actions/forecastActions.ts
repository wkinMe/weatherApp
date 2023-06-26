import { ForecastWeather } from '../slices/forcastSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getForecast } from '../../api/currentWeather';

export const getNewForecast = createAsyncThunk<ForecastWeather, string, {rejectValue: string}>(
    `forecase/getForecast`,
    async (city: string, {rejectWithValue}) => {
        try {
            const response = await getForecast(city)
            return response
        } catch (e: any) {
            return rejectWithValue("Oops... Something goes wrong")
        }
    }
)
