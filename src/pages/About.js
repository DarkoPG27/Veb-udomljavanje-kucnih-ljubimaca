import React from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function About() {
    const { loading, error, data } = useFetch('http://localhost:1337/about')

    if (loading) return <p className='messages'>Loading...</p>
    if (error) return <p className='messages'>Error fetching data :(</p>
    console.log(data.about_content)
    return (

        <div className='single_page'>
            <h1>About page</h1>
            <p>{data.about_content}</p>
        </div>
    )
}
