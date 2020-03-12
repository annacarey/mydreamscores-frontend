import React from 'react';
import UserLogin from '../components/UserLogin'
import SurveyContainer from './SurveyContainer'
import Dashboard from './Dashboard'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class UserContainer extends React.Component {

    render() {
        return (
            <div>User Container
            <Router>
                <Route path='/login' component={UserLogin} />
                <SurveyContainer />
                <Route path = '/dashboard' component={Dashboard} />
            </Router>
            </div>
        )
    }
}

export default UserContainer