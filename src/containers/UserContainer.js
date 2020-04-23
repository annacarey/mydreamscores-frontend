import React from 'react';
import UserLogin from '../components/UserLogin'
import Dashboard from './Dashboard'
import Welcome from '../components/Welcome'
import Journal from '../components/Journal'
import History from '../components/History'
import SentimentView from '../components/SentimentView'
import styled from 'styled-components'
import {connect} from 'react-redux';
import { Redirect, Route, Switch} from 'react-router-dom';
import {getRegionActionCreator} from '../actionCreators'

class UserContainer extends React.Component {   

    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            
        }
    }

    render() {
        return (
            <Wrapper>
                <Switch>
                    <Route exact path ="/" render={ (props) => <Welcome {...props} /> } /> 
                    <Route exact path='/login' render={ () =><UserLogin /> } />
                    {this.props.user.zipcode!==""? <Route exact path = '/dashboard' render={ (props) =><Dashboard {...props} /> }  /> : <Redirect to="/" /> }
                    {this.props.user.zipcode!==""? <Route exact path='/journal' render={(props) => <Journal {...props}/>} /> : <Redirect to="/" /> }
                    {this.props.user.zipcode!==""? <Route exact path = '/mood' render={(props) => <SentimentView {...props}/>} /> : <Redirect to="/" />}
                    {this.props.user.id!==""? <Route exact path = '/history' render={ (props) =><History {...props} /> }  /> : <Redirect to="/" />}
                </Switch>
            </Wrapper>
        )
    }
}


const msp = state => {
    return {
        user: state.user.currentUser
    }
}

const mdp = dispatch => {
    return {
        getRegion: zipcode => dispatch(getRegionActionCreator(zipcode))
    }
}

export default connect(msp, mdp)(UserContainer)

const Wrapper = styled.section`
    height: 100%;
    width: 100%;
`