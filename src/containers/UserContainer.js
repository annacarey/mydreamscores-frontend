import React from 'react';
import UserLogin from '../components/UserLogin'
import SurveyContainer from './SurveyContainer'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

class UserContainer extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/login' component={UserLogin} />
                    <Route exact path = '/dashboard' component={Dashboard} />
                    <SurveyContainer />
                </Switch>
            </div>
        )
    }
}

export default withRouter(UserContainer)