import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
    padding: 20px;
`;

const TVPresenter = ({ topRated, airingToday, popular, error, loading }) =>
    loading ? (
        <Loader>
            <Helmet>
                <title>TV | OBSOS</title>
            </Helmet>
        </Loader>
    ) : (
        <Container>
            <Helmet>
                <title>TV | OBSOS</title>
            </Helmet>

            {airingToday && airingToday.length > 0 && (
                <Section title="Today">
                    {airingToday.map((show) => (
                        <Poster
                            id={show.id}
                            key={show.id}
                            title={show.name}
                            imgUrl={show.poster_path}
                            rating={show.vote_average}
                            year={
                                show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                            }
                            isMovie="show"
                        />
                    ))}
                </Section>
            )}
            {topRated && topRated.length > 0 && (
                <Section title="Top Rated">
                    {topRated.map((show) => (
                        <Poster
                            id={show.id}
                            key={show.id}
                            title={show.name}
                            imgUrl={show.poster_path}
                            rating={show.vote_average}
                            year={
                                show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                            }
                            isMovie="show"
                        />
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popluar">
                    {popular.map((show) => (
                        <Poster
                            id={show.id}
                            key={show.id}
                            title={show.name}
                            imgUrl={show.poster_path}
                            rating={show.vote_average}
                            year={
                                show.first_air_date &&
                                show.first_air_date.substring(0, 4)
                            }
                            isMovie="show"
                        />
                    ))}
                </Section>
            )}
            {error ? <Message text={error} color="tomato" /> : null}
        </Container>
    );
TVPresenter.propTypes = {
    topRated: PropTypes.array,
    airingToday: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
