/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { peopleApi } from '../../api';
import { useInfiniteScroll } from '../../Hooks/useInfiniteScroll';
import uniqBy from 'lodash.uniqby';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';

import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    psdding: 0px 10px;
`;

export default () => {
    const [popular, setPopular] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const page = useInfiniteScroll();

    const loadData = async () => {
        let loadedData = popular;
        const p = (page - 1) * 5;
        try {
            for (let i = p + 1; i < p + 6; i++) {
                const {
                    data: { results: pData },
                } = await peopleApi.popular(i);
                loadedData = [...loadedData, ...pData];
                console.log(loadedData);
                setPopular(uniqBy(loadedData, 'id'));
            }
        } catch {
            setError("Can't find movies information.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
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
};
