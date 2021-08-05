import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from '../component/Home'
import Gaze from '../component/GazeTemplate/Gaze'
import Render from '../component/RenderTemplate/Render'
function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home/:id" component={Home}/>
                <Route path ="/rendering" component={Render} />
                <Route path ="/gaze" component={Gaze}/>
            </Switch>
        
        </BrowserRouter>
    )
}
export default Router