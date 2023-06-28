import {FC} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Forecast from './components/Forecast';
import Layout from './components/Layout';

const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout/>} />
      <Route path="/:city" element={<Forecast/>}/>
    </Routes>
  )
}

export default App;
