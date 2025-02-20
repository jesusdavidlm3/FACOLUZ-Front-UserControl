import React, { useContext } from 'react'
import { routerContext } from './context/routerContext';
import Router from './components/Router';
import NavBar from './components/NavBar';
import ContextProvider from './context/ContextProvider'

const App = () => {

    const {view} = useContext(routerContext)

    return(
        <ContextProvider>
            <div className="Root">
                {view != "Login" && <NavBar /> }
                <Router />
            </div>
        </ContextProvider>
    )
}

export default App;