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

const TrendingContainer = styled.div`
    width: 100vw;
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 8%; // play with this to change height of the children, 50% will fill half
    // grid-template-columns: unset; // do not set template columns and rows
    // grid-template-rows: unset;
    overflow: scroll;
`;

const HomePresenter = ({
    movieResult,
    tvResult,
    personResult,
    error,
    loading,
}) =>
    loading ? (
        <Loader>
            <Helmet>
                <title>Home | OBSOS</title>
            </Helmet>
        </Loader>
    ) : (
        <Container>
            <Helmet>
                <title>Home | OBSOS</title>
            </Helmet>

            {movieResult && movieResult.length > 0 && (
                <Section title="Movies">
                    <TrendingContainer>
                        {movieResult.map((movie) => (
                            <Poster
                                id={movie.id}
                                key={movie.id}
                                title={movie.title}
                                imgUrl={movie.poster_path}
                                rating={movie.vote_average}
                                year={
                                    movie.release_date &&
                                    movie.release_date.substring(0, 4)
                                }
                                isMovie="movie"
                            />
                        ))}
                    </TrendingContainer>
                </Section>
            )}

            {tvResult && tvResult.length > 0 && (
                <Section title="TV SHows">
                    <TrendingContainer>
                        {tvResult.map((show) => (
                            <Poster
                                id={show.id}
                                key={show.id}
                                title={show.name}
                                imgUrl={show.poster_path}
                                rating={show.vote_average}
                                year={
                                    show.release_date &&
                                    show.release_date.substring(0, 4)
                                }
                                isMovie="show"
                            />
                        ))}
                    </TrendingContainer>
                </Section>
            )}
            {personResult && personResult.length > 0 && (
                <Section title="People">
                    <TrendingContainer>
                        {personResult.map((person) => (
                            <Poster
                                id={person.id}
                                key={person.id}
                                title={person.name}
                                imgUrl={person.profile_path}
                                isMovie="profile"
                            />
                        ))}
                    </TrendingContainer>
                </Section>
            )}
            {error ? <Message text={error} color="tomato" /> : null}
        </Container>
    );

HomePresenter.propTypes = {
    movieResult: PropTypes.array,
    tvResult: PropTypes.array,
    personResult: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
