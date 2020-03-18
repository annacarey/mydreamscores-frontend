import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function Welcome(props) {

    const [zipcode, setZipcode] = useState("")

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
        </div>
    )
}

export default Welcome