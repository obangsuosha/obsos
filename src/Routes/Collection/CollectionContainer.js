/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { collectionApi, seasonApi } from '../../api';
import CollectionPresenter from './CollectionPresenter';

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
            isCollection: pathname.includes('/collection'),
        };
    }
    async componentDidMount() {
        const {
            match: {
                params: { id, number },
            },
            history: { push },
        } = this.props;

        const parsedId = parseInt(id);
        const parsedNumber = parseInt(number);
        if (isNaN(parsedId)) {
            return push('/');
        }

        const { isCollection } = this.state;
        let result = null;

        try {
            if (isCollection) {
                console.log(isCollection);
                const request = await collectionApi.detail(parsedId);
                result = request;
            } else {
                console.log(isCollection);
                const request = await seasonApi.detail(parsedId, parsedNumber);
                console.log(request);
                result = request;
            }
        } catch {
            this.setState({ error: "Can't find anything." });
        } finally {
            this.setState({ loading: false, result });
        }
    }

    render() {
        const { result, error, loading } = this.state;
        console.log(this.state);
        return (
            <CollectionPresenter
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}
