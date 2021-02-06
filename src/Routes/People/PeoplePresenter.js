import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';

import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    psdding: 0px 10px;
`;

const PeoplePresenter = ({ popular, error, loading }) =>
    loading ? (
        <Loader>
            <Helmet>
                <title>Movie | OBSOS</title>
            </Helmet>
        </Loader>
    ) : (
        <Container>
            <Helmet>
                <title>Movie | OBSOS</title>
            </Helmet>

            {popular && popular.length > 0 && (
                <Section title="Popular">
                    {popular.map((person) => (
                        <Poster
                            id={person.id}
                            key={person.id}
                            title={person.name}
                            imgUrl={person.profile_path}
                            isMovie="person"
                        />
                    ))}
                </Section>
            )}
            {error ? <Message text={error} color="tomato" /> : null}
        </Container>
    );

PeoplePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default PeoplePresenter;
