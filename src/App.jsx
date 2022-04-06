import React from 'react';
import Routes from './Router/Routes'
import { UseContext } from './Global/UseContext';

const App = () => {
  return (
    <div>
        <UseContext>
             <Routes/>
        </UseContext>
    </div>
  )
}

export default App