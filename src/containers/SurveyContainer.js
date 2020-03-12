import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function SurveyContainer() {

    return (
        <div>
            <Router>
                <Route path='/login' component={UserLogin} />
                
            </Router>
    </div>
    )
    
}

export default SurveyContainer