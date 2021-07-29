import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from '../component/Home'
import Gaze from '../component/GazeTemplate/Gaze'
import Lender from '../component/LenderTemplate/Lender'
function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path ="/lendering" component={Lender} />
                <Route path ="/gaze" component={Gaze}/>
            </Switch>
        
        </BrowserRouter>
    )
}
export default Router