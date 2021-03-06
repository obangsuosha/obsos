import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '1fc1b64292d59440556714979a0ddc78',
        language: 'en-US',
    },
});

export default api;

export const tvApi = {
    topRated: () => api.get('tv/top_rated'),
    popular: (page) => api.get(`tv/popular?page=${page}`),
    airingToday: () => api.get('tv/airing_today'),
    showDetail: (id) =>
        api.get(`tv/${id}`, {
            params: {
                append_to_response: 'videos',
            },
        }),
    search: (term, page) =>
        api.get(`search/tv?page=${page}`, {
            params: {
                query: encodeURIComponent(term),
            },
        }),
    credits: (id) => api.get(`tv/${id}/credits`),
    similar: (id) => api.get(`tv/${id}/similar`),
};

export const movieApi = {
    nowPlaying: () => api.get('movie/now_playing'),
    upcoming: () => api.get('movie/upcoming'),
    popular: (page) => api.get(`movie/popular?page=${page}`),
    movieDetail: (id) =>
        api.get(`movie/${id}`, {
            params: {
                append_to_response: 'videos',
            },
        }),
    search: (term, page) =>
        api.get(`search/movie?page=${page}`, {
            params: {
                query: encodeURIComponent(term),
            },
        }),
    credits: (id) => api.get(`movie/${id}/credits`),
    similar: (id) => api.get(`movie/${id}/similar`),
};

export const peopleApi = {
    popular: (page) => api.get(`person/popular?page=${page}`),
    peopleDetail: (id) =>
        api.get(`person/${id}`, {
            params: {
                append_to_response: 'images',
            },
        }),
    tvCredits: (id) => api.get(`person/${id}/tv_credits`),
    movieCredits: (id) => api.get(`person/${id}/movie_credits`),
    search: (term, page) =>
        api.get(`search/person?page=${page}`, {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};

export const collectionApi = {
    detail: (id) => api.get(`collection/${id}`),
    search: (term) =>
        api.get('search/collection', {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};

export const seasonApi = {
    detail: (id, number) => api.get(`tv/${id}/season/${number}`),
};

export const companyApi = {
    search: (term) =>
        api.get('search/company', {
            params: {
                query: encodeURIComponent(term),
            },
        }),
};

export const trendingApi = {
    movie: () => api.get('trending/movie/week'),
    tv: () => api.get('trending/tv/week'),
    person: () => api.get('trending/person/week'),
};
