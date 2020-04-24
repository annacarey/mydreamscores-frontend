import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import InputBase from '@material-ui/core/InputBase';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import dreamsky from '../images/dreamsky.jpg'
import dreamsky2 from '../images/dreamsky2.jpg'
import dreamsky3 from '../images/dreamsky3.jpg'
import {connect} from 'react-redux';
import {logoutUser, getRegionActionCreator, setError} from '../actionCreators'
import {error as zipcodeError} from '../helpers/error'

function Welcome(props) {

    const [zipcode, setZipcode] = useState("")

    const numChecker = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$")

    const handleSubmit = e => {
        e.preventDefault()
        if (numChecker.test(zipcode)) {
            props.getRegion(zipcode).then(error => {   
                if (error !== zipcodeError) {
                    props.setError(null)
                    props.history.push("/journal")
                }
            })
        } else {
            props.setError(zipcodeError)
        }
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
          width: 275,
          height: 35,
          borderRadius: 25,
          opacity: .6
        },
        input: {
            color: 'black',
            fontSize: '12px',
            opacity: 1.0,
            '&&:placeholder': {
                fontStyle: 'bold',
              textOverflow: 'ellipsis !important',
              color: 'red'
            },
          marginLeft: theme.spacing(3),
          flex: 1,
        },
        iconButton: {
          padding: 5,
          color: 'black',
          width: 40,
        }
      }))
      const classes = useStyles();

    return (
        <Wrapper>
            <Header>What's your DreamScore?</Header>
            <ContentWrapper>
                <P> Your personal dream journal that reflects the mood beneath your subconscious <br/>
                </P>
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
                    <E>  {props.error}</E>
                </FormContainer>
                <Login>Been here before? Log in <Link style={{color: 'white'}} to="/login">here</Link>.</Login>
            </ContentWrapper>
            <Footer>
                Image background: Photo by <a style={{color: 'white'}} href="https://unsplash.com/@alanrobertjones?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alan Jones</a> on <a style={{color: 'white'}} href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </Footer>
        </Wrapper>
    )
}

const msp = state => {
    return {
        error: state.user.error
    }
}

const mdp = dispatch => {
    return {
        logout: () => dispatch(logoutUser()),
        getRegion: zipcode => dispatch(getRegionActionCreator(zipcode)),
        setError: error => dispatch(setError(error))
    }
}

export default connect(msp, mdp)(Welcome)

const Header = styled.h1`
    text-align: center;
    font-size: 40px;
    display: block;
    margin: 0px;
`

const Login = styled.div`
    padding-top: 30px;
    font-size: 15px;
`

const P = styled.div`
    font-size: 15px;
    margin: 20px;
`

const E = styled.div`
    font-size: 12px;
    color: red;
    margin-top: 10px;
`
const ContentWrapper = styled.section`
    width: 375px;
    text-align: center;
`

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

`
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${dreamsky3}) ;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    height: 100%;
    width: 100%;
    flex-wrap: wrap;
`

const Footer = styled.section`
    align-self: flex-end;
    position: absolute;
    width: 350px;
    bottom: 20px;
    color: #808080;
    font-size: 10px;
    text-align: right;
    padding-right: 20px;
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