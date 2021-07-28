import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from '../component/Home'
import Gaze from '../component/GazeTemplate/Gaze'
function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path ="/gaze" component={Gaze}/>
            </Switch>
        
        </BrowserRouter>
    )
}
export default Router