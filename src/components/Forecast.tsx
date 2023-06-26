import React, {FC, useEffect, useState, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/slices/customHooks';
import cn from 'classnames';
import ForecastItem from './ForecastItem';
import "./css/Forecast.css"
import "./css/Weather.css"
import { getNewForecast } from '../store/actions/forecastActions';

const Forecast: FC = () => {
    const dispatch = useAppDispatch()
    const {city} = useParams()

    const cityName = useMemo(() => {
        return {city: city}
    }, [city])

    useEffect(() => {
        console.log(city);
        if (city) {
            dispatch(getNewForecast(city))
        }
    }, [])

    const forecast = useAppSelector(state => state.forecastSlice)

    return (
        <>
            {forecast.isLoading && <h1 className='loader'>Loading...</h1>}
            <h1 className="title">The weather in {city} for 7 days</h1>
            <div className="forecastContainer">
                {forecast.weather.forecast?.forecastday.map(i => {
                    return (
                        <ForecastItem
                            date = {i.date}
                            conditions = {i.day.condition}
                            maxTemp = {i.day.maxtemp_c}
                            minTemp = {i.day.avgtemp_c}
                            windSpeed = {i.day.maxwind_kph}
                            sunrise = {i.astro.sunrise}
                            sunset = {i.astro.sunset}
                            precipChance = {Math.ceil((i.day.daily_chance_of_rain + i.day.daily_chance_of_snow) / 2)}
                            />
                    )
                })}
            </div>
        </>
    )
}

export default Forecast
