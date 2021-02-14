/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { collectionApi, movieApi, peopleApi, tvApi } from '../../api';
import SearchPresenter from './SearchPresenter';

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
        <SearchPresenter
            movieResult={movieResult}
            tvResult={tvResult}
            peopleResult={peopleResult}
            collectionResult={collectionResult}
            searchTerm={searchTerm}
            error={error}
            loading={loading}
            handleSubmit={handleSubmit}
            updateTerm={updateTerm}
        />
    );
};
