/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { tvApi } from '../../api';
import { useInfiniteScroll } from '../../Hooks/useInfiniteScroll';
import uniqBy from 'lodash.uniqby';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
    margin-top: 50px;
    padding: 0 10px;
`;

export default () => {
    const [topRated, setTopRated] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [popular, setPopular] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const page = useInfiniteScroll();

    const loadData = async () => {
        try {
            const {
                data: { results: topRated },
            } = await tvApi.topRated();

            const {
                data: { results: airingToday },
            } = await tvApi.airingToday();

            const {
                data: { results: popular },
            } = await tvApi.popular(page);

            setTopRated(topRated);
            setAiringToday(airingToday);
            setPopular(popular);
        } catch {
        } finally {
        }
    };

    const loadMore = async () => {
        let loadedData = popular;
        console.log(page);

        try {
            const {
                data: { results: sData },
            } = await tvApi.popular(page);
            loadedData = [...loadedData, ...sData];
            console.log(loadedData);
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
};
