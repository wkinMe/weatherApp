import {FC} from "react";
import cn from "classnames"
import "./css/Card.css"
import "./css/Weather.css"
import { useDispatch } from "react-redux";
import {removeCity} from "../store/slices/weatherNowSlice"
import gsap from "gsap"
import {Link} from "react-router-dom"

interface CardItemProps {
    city: string
    country: string
    tempC: number
    weatherCode: number
    weatherConditions: string
    iconSrc: string
    time: string
    isDay: number
}

export const getBGColor = (isDay: number, weatherCode: number) => {
    let bg: string;
    if (isDay) {
        bg = cn({
            day: weatherCode < 1009,
            day_cloudy: weatherCode >= 1009 && weatherCode < 1147,
            day_dull: weatherCode >= 1147 && weatherCode < 1240,
            day_downpour: weatherCode >= 1240
        })
    } else {
        bg = cn({
            night: weatherCode < 1009,
            night_cloudy: weatherCode >= 1009 && weatherCode < 1147,
            night_dull: weatherCode >= 1147 && weatherCode < 1240,
            night_downpour: weatherCode >= 1240
        })
    }
    return bg
}

const Card: FC<CardItemProps> = ({city, country, tempC, weatherCode, weatherConditions, iconSrc, time, isDay}) => {
    const datetime = time.split(" ");
    const date = datetime[0].split("-").reverse().join(".");
    const currentTime = datetime[1];
    const dispatch = useDispatch();

    const removeCurrentCity = (city: string) => {
        dispatch(removeCity(city));
    }

    const cardDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const duration = .25;
        const itemToRemove = e.currentTarget.closest(`.card`);

        gsap.to(itemToRemove, {
            y: -150,
            scale: .3,
            duration,
            opacity: 0,
            display: `none`,
        })
        setTimeout(() => removeCurrentCity(city), duration * 1000);

        const cards = Array.from(document.querySelectorAll(`.card`))

        if (itemToRemove) {
            const indToRemove = cards.indexOf(itemToRemove)
            for(let i = cards.length - 1; i > indToRemove; i--) {
                gsap.to(cards[i], {
                    x: -cards[i].clientWidth,
                    duration: .2,
                })
            }
        }

    }


    const bg = getBGColor(isDay, weatherCode);

    return (
        <Link to = {city} className={"card " + bg} key={city}>
            <span className="forecast">Click to get forecast for a 7 days</span>
            <span className="close" onClick={cardDelete}>
            ×</span>
            <img src={iconSrc}/>
            <div className="city_info">
                <span className="city_info_name">{city}</span>
                <span className="city_info_country">{country}</span>
            </div>
            <span className="temp">{Math.trunc(tempC)}°C</span>
            <div className="datetime_info">
                <span className="datetime_info_text">{date}</span><br/>
                <span className="datetime_info_text">{currentTime}</span>
            </div>
            <span className = 'conditions'>{weatherConditions}</span>
        </Link>
    )
}

export default Card