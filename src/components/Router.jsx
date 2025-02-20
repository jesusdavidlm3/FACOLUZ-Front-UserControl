import React, {useContext} from "react";
import { routerContext } from "../context/routerContext"
import ErrorPage from '../pages/ErrorPage'
import ChangeLogs from '../pages/ChangeLogs'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserAdministration from '../pages/UserAdministration'
import UserReactivation from '../pages/UserReactivation'

const Router = () => {

    const {view} = useContext(routerContext)

    try{
        switch(view){
            case "ChangeLogs": return <ChangeLogs />
            case "Home": return <Home />
            case "Login": return <Login />
            case "UserAdministration": return <UserAdministration/>
            case "UserReactivation": return <UserReactivation />
            default: return <ErrorPage />
        }
    }catch(err){
        return <ErrorPage />
    }
}

export default Router;