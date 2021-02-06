/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { peopleApi } from '../../api';
import ProfilePresenter from './ProfilePresenter';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null,
            error: null,
            loading: true,
            category: null,
            movieCredits: null,
            tvCredits: null,
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

        let result = null;
        let tvCredits = null;
        let movieCredits = null;

        try {
            const request = await peopleApi.peopleDetail(parsedId);
            result = request.data;
            const tvRequest = await peopleApi.tvCredits(parsedId);
            tvRequest.data.cast = tvRequest.data.cast.sort((a, b) => {
                return b.popularity - a.popularity;
            });

            tvCredits = tvRequest.data;
            const movieRequest = await peopleApi.movieCredits(parsedId);
            movieRequest.data.cast = movieRequest.data.cast.sort((a, b) => {
                return b.popularity - a.popularity;
            });
            movieCredits = movieRequest.data;
        } catch {
            this.setState({ error: "Can't find anything." });
        } finally {
            this.setState({ loading: false, result, tvCredits, movieCredits });
        }
    }

    render() {
        const { result, error, loading, tvCredits, movieCredits } = this.state;
        console.log(this.state);
        return (
            <ProfilePresenter
                result={result}
                error={error}
                loading={loading}
                tvCredits={tvCredits}
                movieCredits={movieCredits}
            />
        );
    }
}
