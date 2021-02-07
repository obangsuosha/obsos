/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { collectionApi, movieApi, peopleApi, tvApi } from '../../api';
import SearchPresenter from './SearchPresenter';

export default class extends React.Component {
    state = {
        movieResult: null,
        tvResult: null,
        peopleResult: null,
        collectionResult: null,
        companyResult: null,
        searchTerm: '',
        error: null,
        loading: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if (searchTerm !== ' ') {
            this.searchByTerm();
        }
    };
    updateTerm = (event) => {
        const {
            target: { value },
        } = event;
        console.log(value);
        this.setState({ searchTerm: value });
    };
    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
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

            this.setState({
                movieResult,
                tvResult,
                peopleResult,
                collectionResult,
            });
        } catch {
            this.setState({ error: "can't find result" });
        } finally {
            this.setState({ loading: false });
        }
    };

    // componentDidMount() {
    //     this.handleSubmit();
    // }
    render() {
        const {
            movieResult,
            tvResult,
            searchTerm,
            peopleResult,
            collectionResult,

            error,
            loading,
        } = this.state;
        console.log(this.state);
        return (
            <SearchPresenter
                movieResult={movieResult}
                tvResult={tvResult}
                peopleResult={peopleResult}
                collectionResult={collectionResult}
                searchTerm={searchTerm}
                error={error}
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}
