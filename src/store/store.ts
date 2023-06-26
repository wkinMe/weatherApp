import {configureStore} from "@reduxjs/toolkit"
import weatherNowSlice from "./slices/weatherNowSlice"
import forecastSlice from './slices/forcastSlice';

const store = configureStore({
    reducer: {
        weatherNowSlice,
        forecastSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type RootStore = typeof store