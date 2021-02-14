/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    align-items: center;
    padding: 0px 10px;
    background-color: rgba(20, 20, 20, 0.5);
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;
const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

const Item = styled.li`
    &:not(:last-child) {
        margin-right: 10px;
    }

    height: 50px;
    text-align: center;
    border-bottom: 3px solid
        ${(props) => (props.current ? 'red' : 'transparent')};
    transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
    height: 50px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
    <Header>
        {/* {console.log(props)} */}
        <List>
            <Item current={pathname === '/'}>
                <SLink to="/">Trending</SLink>
            </Item>
            <Item current={pathname === '/movielist'}>
                <SLink to="/movielist">Movie</SLink>
            </Item>
            <Item current={pathname === '/showlist'}>
                <SLink to="/showlist">TV</SLink>
            </Item>
            <Item current={pathname === '/people'}>
                <SLink to="/people">People</SLink>
            </Item>
            <Item current={pathname === '/search'}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
    </Header>
));
