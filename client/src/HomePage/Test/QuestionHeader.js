import React from 'react';


const questionheader = ({header}) => {

    return(
        <div className="QuestionHeader">
            <div className="column">
                <h2>Teacher: {header.teacher} || Subject: {header.subject} || Class:{header.classNo}</h2>
{
}
            </div>
        </div>
    )

}

export default questionheader;