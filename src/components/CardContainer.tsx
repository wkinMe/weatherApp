import React, {FC} from "react";
import CardItem from "./CardItem"
import "./css/Current.css"
import {Weather} from "../store/slices/weatherNowSlice"

interface CardContainreProps {
    citiesWeather: Weather[]
}

const CardContainer: FC<CardContainreProps> = ({citiesWeather}) => {
    return (
        <div className="card_container">
                {citiesWeather.map(city => {
                    return (
                        <CardItem
                            city={city.location.name}
                            country = {city.location.country}
                            tempC = {city.current.temp_c}
                            weatherCode = {city.current.condition.code}
                            iconSrc = {city.current.condition.icon}
                            time = {city.location.localtime}
                            isDay = {city.current.is_day}
                            weatherConditions = {city.current.condition.text}
                        />
                    )
                })}
        </div>
    )
}

export default CardContainer