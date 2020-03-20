import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {CircleProgress} from 'react-gradient-progress'
import styled from 'styled-components'
import headheart from '../images/headheart.png'

function Welcome(props) {

    const [zipcode, setZipcode] = useState("")
    // const [progress, setProgress] = useState(0)


    const handleSubmit = e => {
        e.preventDefault()
        props.setZipcode(zipcode)
        props.history.push("/journal")
    }

    return (
        <Wrapper>
            <Header>How are you? </Header>
            <ContentWrapper>
                <p>Really, how are you doing? </p>
                <p> 
                    As the novel coronavirus unfolds, it becomes more difficult to slow down and reflect.
                    Many are quantifying the physical and economic toll of the pandemic, but how is COVID-19 affecting 
                    our mental and emotional wellbeing?
                </p>
                    <Form onSubmit={handleSubmit}>
                        Input your zipcode to continue:  
                        <br></br>
                        <InputGroup>
                            <Input onChange={e => setZipcode(e.target.value)} type="text" placeholder="00000" />
                            <Submit className = 'btn' type="submit" value="Go" />
                        </InputGroup>
                    </Form>
                {/* <Progress>
                    We are currently gathering responses to show you trends and progress over time. Help us reach our goal for number of responses. Here's how close we are:
                    <CircleProgress width={100} percentage={70} strokeWidth={8} secondaryColor="#f0f0f0" />
                </Progress> */}
            </ContentWrapper>
            <Footer>
                <p>Been here before? Log in to your account <Link to="/login">here</Link>.</p>
            </Footer>
        </Wrapper>
    )
}

export default Welcome

const Header = styled.h1`
    text-align: center;
    font-size: 30px;
    background-color: black;
`
const Progress = styled.section`
    
    display: flex;
    flex-direction: column;
    width: 50vw;
    background-color: #6E5FE2;
    padding: 10px;
    border-radius: 10px;
    color: white;
`

const InputGroup = styled.section`
    padding-top: 5px;
    display: flex;
`

const Submit = styled.input`
    background-color: black;
    color: white;
`

const ContentWrapper = styled.section`
    background-color: black;
    width: 350px;
    padding: 5px;
    border-radius: 10px;
`

const Form = styled.form`
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
    height: 100vh;
    padding: 20px;
    padding-right: 10px;
    background-image: url(${headheart}) ;
    background-size: 100% auto;
    color: white;
    height: 100vh;
`

const Input = styled.input`
    width: 60px;
    border-radius: 5px;
    background: black;
    color: white;
    padding: 5px;
    margin-right: 5px;
`

const Footer = styled.section`
    align-self: center;
    position: absolute;
    bottom: 0px;
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