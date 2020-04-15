import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import InputBase from '@material-ui/core/InputBase';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import mountains from '../images/mountains.jpeg'
import {connect} from 'react-redux';
import {logoutUser} from '../actionCreators'

function Welcome(props) {

    const [zipcode, setZipcode] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        props.setZipcode(zipcode)
        props.history.push("/journal")
    }

    useEffect(() => {
        props.logout()
    }, [])

    const useStyles = makeStyles(theme => ({
        root: {
          padding: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 400,
          borderRadius: 25,
          opacity: .6
        },
        input: {
            color: 'black',
            '&&:placeholder': {
                fontStyle: 'bold',
              textOverflow: 'ellipsis !important',
              color: 'red'
            },
          marginLeft: theme.spacing(3),
          flex: 1,
        },
        iconButton: {
          padding: 10,
          color: 'black'
        }
      }))
      const classes = useStyles();

    return (
        <Wrapper>
            <Header>How are you? </Header>
            <ContentWrapper>
                <p> Really, how are you doing? <br/>
                    As the novel coronavirus unfolds, it becomes <br/>more difficult to slow down and reflect.
                    Many <br/>are quantifying the physical and economic toll<br/> of the pandemic, but how is COVID-19<br/> affecting 
                    our mental and emotional wellbeing?
                </p>
                <br/>
                <FormContainer>
                    <Paper onSubmit={handleSubmit} component="form" className={classes.root}>
                        <InputBase
                            onChange={(e) => setZipcode(e.target.value)}
                            className={classes.input}
                            placeholder="Input your zipcode"
                            inputProps={{ classes: {input: classes.input} }}
                        />
                        <IconButton type="submit" className={classes.iconButton} >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Paper>
                </FormContainer>
                <Login>Been here before? Log in <Link style={{color: '#d3d3d3'}} to="/login">here</Link>.</Login>
            </ContentWrapper>
            <Footer>
            </Footer>
        </Wrapper>
    )
}

const mdp = dispatch => {
    return {
        logout: () => dispatch(logoutUser())
    }
}


export default connect(null, mdp)(Welcome)

const Header = styled.h1`
    text-align: center;
    font-size: 30px;
    margin: 10px;
`

const Login = styled.div`
    padding-top: 50px;
`

const ContentWrapper = styled.section`
    width: 450px;
    text-align: center;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
}

`
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    padding-right: 10px;
    background-image: url(${mountains}) ;
    background-size: 100% auto;
    color: white;
    height: 100%;
    width: 100%;
`

const Footer = styled.section`
    align-self: center;
    position: absolute;
    bottom: 20px;
    color: white;
`


//colors
// https://coolors.co/ae00ff-6e5fe2-2c217f-2cda9d-05f140
// background-image: url(${headheart})


// color: white;
// background-image: url(${headheart});

//More info on progress bar: 
// https://medium.com/better-programming/build-beautiful-gradient-enabled-circular-progress-bars-in-react-d0a746deed0

//heart image:
// Photo by Alexandru Acea on Unsplash
//brain image:
// Photo by Tayla Jeffs on Unsplash