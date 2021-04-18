import { useState, useEffect } from 'react';

//making a custom hook
const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortConst = new AbortController();//can be used to stop fetch request

        fetch(url, { signal: abortConst.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();// passes the json to an js object and returns it
            })
            .then(data => {
                // console.log(data);
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (!err.name === 'AbortError')
                    setIsLoading(false);
                setError(err.message);
            })
        return () => abortConst.abort();
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;