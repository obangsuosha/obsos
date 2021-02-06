/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { tvApi } from '../../api';
import TVPresenter from './TVPresenter';

export default class extends React.Component {
    state = {
        topRated: null,
        airingToday: null,
        popular: null,
        error: null,
        loading: true,
    };

    async componentDidMount() {
        try {
            const {
                data: { results: topRated },
            } = await tvApi.topRated();
            console.log(topRated);

            const {
                data: { results: airingToday },
            } = await tvApi.airingToday();
            console.log(airingToday);
            const {
                data: { results: popular },
            } = await tvApi.popular();
            console.log(popular);

            this.setState({
                topRated,
                airingToday,
                popular,
            });
        } catch {
            this.setState({ error: "Can't find TV information." });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { topRated, airingToday, popular, error, loading } = this.state;
        console.log(this.state);
        return (
            <TVPresenter
                topRated={topRated}
                airingToday={airingToday}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}
