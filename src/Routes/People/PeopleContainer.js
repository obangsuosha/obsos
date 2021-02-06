/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { peopleApi } from '../../api';
import PeoplePresenter from './PeoplePresenter';

export default class extends React.Component {
    state = {
        popular: null,
        error: null,
        loading: true,
    };

    async componentDidMount() {
        try {
            const {
                data: { results: popular },
            } = await peopleApi.popular();
            console.log(popular);
            this.setState({
                popular,
            });
        } catch {
            this.setState({ error: "Can't find movies information." });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { popular, error, loading } = this.state;
        console.log(this.state);
        return (
            <PeoplePresenter
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}
