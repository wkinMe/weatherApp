import {FC, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/slices/customHooks';
import ForecastItem from './ForecastItem';
import "./css/Forecast.css"
import "./css/Weather.css"
import { clearForecast } from '../store/slices/forcastSlice';
import { getNewForecast } from '../store/actions/forecastActions';

const Forecast: FC = () => {
    const dispatch = useAppDispatch()
    const {city} = useParams()

    useEffect(() => {
        console.log(city);
        if (city) {
            dispatch(getNewForecast(city))
        }
        return () => {
            dispatch(clearForecast())
        }
    }, [])

    const forecast = useAppSelector(state => state.forecastSlice)

    return (
        <>
            {forecast.isLoading && <h1 className='loader'>Loading...</h1>}
            <div className="titleContainer">
                <Link to = "/" className = "backBtn">←</Link>
                <h1 className="title">The weather in {city} for 7 days</h1>
            </div>
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
