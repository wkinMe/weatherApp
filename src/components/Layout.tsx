import React, {FC} from 'react';
import { useAppDispatch, useAppSelector } from '../store/slices/customHooks';
import CardContainer from './CardContainer';
import { getNewCity } from '../store/actions/weatherNowActions';

const Layout: FC = () => {
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
        dispatch(getNewCity(e.currentTarget.value))
        e.currentTarget.value = ''
      }}/>
      {isLoading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>{error}</h1>}
      <CardContainer citiesWeather = {cities}/>
    </div>
    )
}

export default Layout