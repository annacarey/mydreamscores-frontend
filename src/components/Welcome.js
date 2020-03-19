import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {CircleProgress} from 'react-gradient-progress'

function Welcome(props) {

    const [zipcode, setZipcode] = useState("")
    const [progress, setProgress] = useState(0)


    const handleSubmit = e => {
        e.preventDefault()
        props.setZipcode(zipcode)
        props.history.push("/journal")
    }

    return (
        <div>
            <h1>Welcome to CoronavirusNow</h1>
            <p>
                The novel Coronavirus COVID19 has had an unknown economic, phyiscal, and psychological toll on the global population. Many of quantified the effects so far on the economy and our physical health, but what are the numbers behind the pandemic's effect on our mental and emotional wellbeing. Press start to partake in our project.
            </p>
            <form onSubmit={handleSubmit}>
                What is your zipcode? <input onChange={e => setZipcode(e.target.value)} type="text" />
                <input type="submit" />
            </form>
            <p>Been here before? Log in to your account <Link to="/login">here</Link>.</p>
            
            <p>We are currently gathering responses to show you trends and progress over time. Help us reach our goal for number of responses. Here's how close we are:</p>
            <CircleProgress percentage={70} strokeWidth={8} secondaryColor="#f0f0f0" />
        </div>
    )
}

export default Welcome

//More info on progress bar: 
// https://medium.com/better-programming/build-beautiful-gradient-enabled-circular-progress-bars-in-react-d0a746deed0