/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { movieApi } from '../../api';
import MoviePresenter from './MoviePresenter';

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true,
    };

    async componentDidMount() {
        try {
            const {
                data: { results: nowPlaying },
            } = await movieApi.nowPlaying();
            console.log(nowPlaying);

            const {
                data: { results: upcoming },
            } = await movieApi.upcoming();
            console.log(upcoming);
            const {
                data: { results: popular },
            } = await movieApi.popular();
            console.log(popular);
            this.setState({
                nowPlaying,
                upcoming,
                popular,
            });
        } catch {
            this.setState({ error: "Can't find movies information." });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        console.log(this.state);
        return (
            <MoviePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}
