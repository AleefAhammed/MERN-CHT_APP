import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import Robot from '../assets/robot.gif'

function Welcome({ currentUser }) {

    const [currentUserName, setCurrentUserName] = useState(undefined);

    useEffect(() => {

        if (currentUser) {

            setCurrentUserName(currentUser.username);
        }
    }, [currentUser])

    return (

        <Container>
            <img src={Robot} alt="Robot" />

            <h2>Welcome <span>{currentUserName}</span></h2>
            <h3>Start chatting With your friends</h3>
        </Container>

    )
}

const Container = styled.div`

display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img{
    height:20rem;
}
span{
    color: #4e0eff;
}
`;
export default Welcome