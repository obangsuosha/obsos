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

const MoviePresenter = ({ nowPlaying, upcoming, popular, error, loading }) =>
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
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {nowPlaying.map((movie) => (
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
                </Section>
            )}
            {upcoming && upcoming.length > 0 && (
                <Section title="Upcoming">
                    {upcoming.map((movie) => (
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
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular">
                    {popular.map((movie) => (
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
                </Section>
            )}
            {error ? <Message text={error} color="tomato" /> : null}
        </Container>
    );

MoviePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default MoviePresenter;
