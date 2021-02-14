/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from 'react';
import { movieApi, tvApi } from '../../api';
import DetailPresenter from './DetailPresenter';

export default (props) => {
    console.log('PROPS!!!');
    console.log(props);
    const {
        location: { pathname },
    } = props;
    const {
        match: {
            params: { id },
        },
        history: { push },
    } = props;

    const [result, setResult] = useState(null);
    const [credits, setCredits] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMovie, setIsMovie] = useState(pathname.includes('/movie'));

    const viewDetail = async () => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push('/');
        }

        let result = null;
        let credits = null;
        let similar = null;
        try {
            if (isMovie) {
                const request = await movieApi.movieDetail(parsedId); //why?
                result = request.data;
                const creditsRequest = await movieApi.credits(parsedId);

                credits = creditsRequest;
                credits.data.crew = credits.data.crew.filter(
                    (credits) =>
                        credits.job === 'Director' ||
                        credits.job === 'Producer' ||
                        credits.job === 'Writer'
                );
                credits.data.crew = credits.data.crew.sort(
                    (a, b) => b.job - a.job
                );
                console.log(credits.data.crew);
                const simlarRequest = await movieApi.similar(parsedId);

                simlarRequest.data.results = simlarRequest.data.results.sort(
                    (a, b) => {
                        return b.popularity - a.popularity;
                    }
                );
                similar = simlarRequest;
            } else {
                const request = await tvApi.showDetail(parsedId);
                result = request.data;
                const creditsRequest = await tvApi.credits(parsedId);

                credits = creditsRequest;
                const simlarRequest = await tvApi.similar(parsedId);
                simlarRequest.data.results = simlarRequest.data.results.sort(
                    (a, b) => {
                        return b.popularity - a.popularity;
                    }
                );
                similar = simlarRequest;
            }
        } catch {
            setError("Can't find anything.");
        } finally {
            setResult(result);
            setCredits(credits);
            setSimilar(similar);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        viewDetail();
    }, [id]);

    return (
        <DetailPresenter
            result={result}
            error={error}
            loading={loading}
            credits={credits}
            similar={similar}
        />
    );
};
