import React from 'react';
import UserLogin from '../components/UserLogin'
import SurveyContainer from './SurveyContainer'
import Dashboard from './Dashboard'
import Welcome from '../components/Welcome'
import Journal from '../components/Journal'
import SentimentView from '../components/SentimentView'
import Graph from '../components/Graph'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class UserContainer extends React.Component {

    state = {
        zipcode: ""
    }

    setZipcode = (zipcode) => {
        this.setState(() => { return {zipcode: zipcode}})
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path ="/" render={ (props) => <Welcome {...props} setZipcode={this.setZipcode}/> } /> 
                    <Route exact path='/login' render={ () =><UserLogin /> } />
                    <Route exact path = '/dashboard' render={ () =><Dashboard /> }  />
                    <Route exact path='/journal' render={() => <Journal zipcode={this.state.zipcode}/>} />
                    <Route exact path = '/sentiment' render={ () =><SentimentView zipcode={this.state.zipcode} /> }  />
                    <Route exact path = '/graph' render={ () =><Graph /> }  />
                    <SurveyContainer />
                </Switch>
            </div>
        )
    }
}

export default UserContainer