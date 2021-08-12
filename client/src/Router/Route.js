import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from '../component/Home'
import Gaze from '../component/GazeTemplate/Gaze'
import Render from '../component/RenderTemplate/Render'
import ErrorPage from '../component/ErrorTemplate/ErrorPage'
import Group from '../component/GroupTemplate/Group'
function Router() {
    return (
       
        <BrowserRouter>
            <Switch>
                <Route exact path="/home/:id" component={Home}/>
                <Route exact path ="/:roomname/:useremail/:roomowner/:nickname/:roomtype" component={Render} />
                <Route path ="/gaze" component={Gaze}/>
                <Route path = "/errorpage" component = {ErrorPage}/>
                <Route path = "/group" component = {Group} />
            </Switch>
        
        </BrowserRouter>
    )
}
export default Router