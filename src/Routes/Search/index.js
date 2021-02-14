/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { collectionApi, movieApi, peopleApi, tvApi } from '../../api';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import Section from '../../Components/Section';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    psdding: 0px 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

export default () => {
    const [movieResult, setMovieResult] = useState([]);
    const [tvResult, setTvResult] = useState([]);
    const [peopleResult, setPeopleResult] = useState([]);
    const [collectionResult, setCollectionResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchTerm !== ' ') {
            searchByTerm();
        }
    };
    const updateTerm = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value);
        setSearchTerm(value);
    };
    const searchByTerm = async () => {
        setLoading(true);
        try {
            const {
                data: { results: movieResult },
            } = await movieApi.search(searchTerm);
            const {
                data: { results: tvResult },
            } = await tvApi.search(searchTerm);
            const {
                data: { results: peopleResult },
            } = await peopleApi.search(searchTerm);
            const {
                data: { results: collectionResult },
            } = await collectionApi.search(searchTerm);

            setMovieResult(movieResult);
            setTvResult(tvResult);
            setPeopleResult(peopleResult);
            setCollectionResult(collectionResult);
        } catch {
            setError("can't find result");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Helmet>
                <title>Search | OBSOS</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                <Input
                    placeholder="Search Contents... "
                    value={searchTerm}
                    onChange={updateTerm}
                />
            </Form>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {collectionResult && collectionResult.length > 0 && (
                        <Section title="Collection">
                            {collectionResult.map((collection) => (
                                <Poster
                                    id={collection.id}
                                    key={collection.id}
                                    title={collection.name}
                                    imgUrl={collection.poster_path}
                                    isMovie="collection"
                                />
                            ))}
                        </Section>
                    )}
                    {movieResult && movieResult.length > 0 && (
                        <Section title="Movies">
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
                        </Section>
                    )}

                    {tvResult && tvResult.length > 0 && (
                        <Section title="TV Shows">
                            {tvResult.map((show) => (
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

                    {peopleResult && peopleResult.length > 0 && (
                        <Section title="People">
                            {peopleResult.map((person) => (
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
                </>
            )}
            {error ? <Message text={error} color="tomato" /> : null}
            {tvResult &&
                tvResult.length === 0 &&
                movieResult &&
                movieResult.length === 0 && (
                    <Message text={`Nothing found `} color="teal" />
                )}
        </Container>
    );
};
