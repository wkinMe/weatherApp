import {configureStore, combineReducers} from "@reduxjs/toolkit"
import weatherNowSlice from "./slices/weatherNowSlice"

const store = configureStore({
    reducer: {
        weatherNowSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type RootStore = typeof store