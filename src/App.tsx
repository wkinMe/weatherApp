import React from 'react';
import './App.css';
import CurrentWeather from './components/CardContainer';
import { useAppDispatch, useAppSelector } from './store/slices/customHooks';
import { getCity, Weather, weatherNowSlice }from './store/slices/weatherNowSlice';

const App = () => {
  const cities = useAppSelector(state => state.weatherNowSlice.cities)
  const isLoading = useAppSelector(state => state.weatherNowSlice.isLoading)
  const error = useAppSelector(state => state.weatherNowSlice.error)
  const dispatch = useAppDispatch()

  return (
    <div className='container'>
      <input type="text" className='city_input' placeholder='City...' onKeyDown={e => {
        if (e.key !== "Enter") {
          return
        }
        dispatch(getCity(e.currentTarget.value))
        e.currentTarget.value = ''
      }}/>
      {isLoading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>{error}</h1>}
      <CurrentWeather citiesWeather = {cities}/>
    </div>
  )
}

export default App;
