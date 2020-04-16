import React from 'react';
import UserLogin from '../components/UserLogin'
import Dashboard from './Dashboard'
import Welcome from '../components/Welcome'
import Journal from '../components/Journal'
import SentimentView from '../components/SentimentView'
import styled from 'styled-components'
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {getRegionActionCreator} from '../actionCreators'

class UserContainer extends React.Component {

    state = {
        zipcode: ""
    }

    setZipcode = (zipcode) => {
        this.setState(() => { return {zipcode: zipcode}})
        this.props.getRegion(zipcode)
    }

    render() {
        return (
            <Wrapper>
                <Switch>
                    <Route exact path ="/" render={ (props) => <Welcome {...props} setZipcode={this.setZipcode}/> } /> 
                    <Route exact path='/login' render={ () =><UserLogin /> } />
                    <Route exact path = '/dashboard' render={ (props) =><Dashboard {...props} zipcode={this.state.zipcode} /> }  />
                    <Route exact path='/journal' render={() => <Journal zipcode={this.state.zipcode}/>} />
                    <Route exact path = '/sentiment' render={ (props) =><SentimentView {...props} zipcode={this.state.zipcode} /> }  />
                </Switch>
            </Wrapper>
        )
    }
}

const mdp = dispatch => {
    return {
        getRegion: zipcode => dispatch(getRegionActionCreator(zipcode))
    }
}

export default connect(null, mdp)(UserContainer)

const Wrapper = styled.section`
    height: 100vh;
    width: 100vw;
`