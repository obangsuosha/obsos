/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 200px;
`;

export default () => (
    <Container>
        <img
            src="https://i.imgur.com/ReBzcvO.gif"
            alt="this slowpoke moves"
            width="100%"
            height="100%"
        />
    </Container>
);

// src="https://cdna.artstation.com/p/assets/images/images/016/928/246/original/cloe-ferrara-loader1-0.gif?1554021979"
