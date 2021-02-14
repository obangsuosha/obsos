/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { movieApi, tvApi } from '../../api';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname },
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes('/movie'),
        };
    }
    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;

        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push('/');
        }

        const { isMovie } = this.state;

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
            this.setState({ error: "Can't find anything." });
        } finally {
            this.setState({ loading: false, result, credits, similar });
        }
    }

    render() {
        const { result, error, loading, credits, similar } = this.state;
        console.log(this.state);
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
                credits={credits}
                similar={similar}
            />
        );
    }
}
