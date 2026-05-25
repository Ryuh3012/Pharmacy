import React from 'react'
import axios from 'axios';
import Navegation from './Navegation'

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Navegation />
  )
}

export default App;