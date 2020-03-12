import React from 'react';
import UserWelcome from '../components/UserWelcome'
import SurveyContainer from './SurveyContainer'
import Dashboard from './Dashboard'

class UserContainer extends React.Component {

    render() {
        return (
            <div>User Container
                <UserWelcome />
                <SurveyContainer />
                <Dashboard />
            </div>
        )
    }
}

export default UserContainer