/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { trendingApi } from '../../api';
import HomePresenter from './HomePresenter';

export default class extends React.Component {
    state = {
        movieResult: null,
        tvResult: null,
        personResult: null,
        error: null,
        loading: true,
    };

    async componentDidMount() {
        try {
            const {
                data: { results: movieResult },
            } = await trendingApi.movie();
            console.log(movieResult);

            const {
                data: { results: tvResult },
            } = await trendingApi.tv();
            console.log(tvResult);
            const {
                data: { results: personResult },
            } = await trendingApi.person();
            console.log(personResult);
            this.setState({
                movieResult,
                tvResult,
                personResult,
            });
        } catch {
            this.setState({ error: "Can't find movies information." });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const {
            movieResult,
            tvResult,
            personResult,
            error,
            loading,
        } = this.state;
        console.log(this.state);
        return (
            <HomePresenter
                movieResult={movieResult}
                tvResult={tvResult}
                personResult={personResult}
                error={error}
                loading={loading}
            />
        );
    }
}
