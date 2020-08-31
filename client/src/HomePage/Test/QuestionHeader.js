import React from 'react';
import { Grid } from 'semantic-ui-react';
import { StudentClock } from '../../CreateTestPage/StartClock';


const questionheader = ({header}) => {

    return(
        <div className="QuestionHeader">
            <div className="column">

              <center>
                  <h2><StudentClock/></h2>
            </center>  
                
            </div>
        </div>
    )

}

export default questionheader;