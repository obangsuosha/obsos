/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { movieApi } from '../api';
import { useInfiniteScroll } from '../Hooks/useInfiniteScroll';
import uniqBy from 'lodash.uniqby';
import styled from 'styled-components';
import Section from '../Components/Section';
import Loader from '../Components/Loader';

import Message from '../Components/Message';
import Poster from '../Components/Poster';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    margin-top: 50px;
    psdding: 0px 10px;
`;

export default () => {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const page = useInfiniteScroll();

    const loadData = async () => {
        try {
            const {
                data: { results: nowPlaying },
            } = await movieApi.nowPlaying();

            const {
                data: { results: upcoming },
            } = await movieApi.upcoming();

            const {
                data: { results: popular },
            } = await movieApi.popular(page);

            setNowPlaying(nowPlaying);
            setUpcoming(upcoming);
            setPopular(popular);
        } catch {
            setError("Can't find movies information.");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        let loadedData = popular;

        try {
            const {
                data: { results: mData },
            } = await movieApi.popular(page);
            loadedData = [...loadedData, ...mData];

            setPopular(uniqBy(loadedData, 'id'));
        } catch {
            setError("Can't find TV information.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        loadMore();
    }, [page]);

    return loading ? (
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
};
