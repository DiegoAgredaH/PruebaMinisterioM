import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {

        setState({ data: null, loading: true, error: null })

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setState({
                    loading: false,
                    error: null,
                    data: data.features
                });

            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
    }, [url]);

    return state;
};