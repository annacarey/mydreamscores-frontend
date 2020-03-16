import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Survey from '../components/Survey'
import Journal from '../components/Journal'



function SurveyContainer() {

    return (
        <div>
            <Switch>
                <Route exact path='/survey' component={Survey} />
                <Route exact path='/journal' render={props => <Journal {...props}/>} />
            </Switch>
        </div>
    )
    
}

export default SurveyContainer