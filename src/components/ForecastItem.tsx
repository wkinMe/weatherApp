import {FC} from 'react';
import {getBGColor} from "./CardItem"
import "./css/ForecastItem.css"
import sunriseImg from "../imgs/sunrise.svg"
import sunsetImg from "../imgs/sunset.svg"
import windImg from "../imgs/wind.svg"
import precipImg from "../imgs/precip.svg"

interface ForecastItemProps {
    date: string,
    sunrise: string,
    sunset: string,
    conditions: Conditions
    maxTemp: number
    minTemp: number
    windSpeed: number
    precipChance: number
}

interface Conditions {
    code: number
    text: string
    icon: string
}

const ForecastItem: FC<ForecastItemProps> = ({date, conditions, maxTemp, minTemp, precipChance, windSpeed, sunrise, sunset}) => {
    let currentDate = date.split("-").reverse().join(".")
    let day;
    switch(new Date(date).getDay()) {
        case 0: {
            day = "Monday"
            break;
        }
        case 1: {
            day = "Tuesday"
            break;
        }
        case 2: {
            day = "Wednesday"
            break;
        }
        case 3: {
            day = "Thursday"
            break;
        }
        case 4: {
            day = "Friday"
            break;
        }
        case 5: {
            day = "Saturday"
            break;
        }
        case 6: {
            day = "Sunday"
            break;
        }
    }

    const bg = 'forecastItem ' + getBGColor(1 ,conditions.code)

    return (
        <div className = {bg}>
            <div className="mainInfo">
                <div className='dayInfo'>
                    <span className="dayNum">{currentDate}</span>
                    <span className="date">{day}</span>
                </div>
                <div className = "conditionsInfo">
                    <img src={conditions.icon} alt="" className="weatherImg" />
                    <div className="conditions">
                        <span className="generalCondition">{conditions.text}</span>
                        <span className="temp">{Math.floor(minTemp)}...{Math.floor(maxTemp)}°C</span>
                    </div>
                </div>
            </div>
            <div className="secondaryInformation">
                <div className="secItem">
                    <img src={sunriseImg} alt="sunrise"/>
                    <span>{sunrise}</span>
                </div>
                <div className="secItem">
                    <img src={sunsetImg} alt="sunset"/>
                    <span>{sunset}</span>
                </div>
                <div className="secItem">
                    <img src={windImg} alt="wind speed"/>
                    <span>{windSpeed} kph</span>
                </div>
                <div className="secItem">
                    <img src={precipImg} alt="precip chance"/>
                    <span>{precipChance} %</span>
                </div>
            </div>
        </div>
    )
}

export default ForecastItem