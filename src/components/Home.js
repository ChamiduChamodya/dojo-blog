// import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {

    const { data: blogs, isLoading, error } = useFetch('http://localhost:8000/blogs')
    // data:blogs <- this grabs the data but its now reffered as blogs by using the ':' 


    // const [name,setName] = useState('mario');
    // useEffect dependencies
    // useEffect(() => {
    //     console.log('use Effect');
    // },[name]);
    // [] added as an second argument to make sure the the hook runs only at initial render 
    // [name] in this the name property is an dependency so now usEffect will trigger if name state is changed



    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} />}
            {/* This is used so that to make sure an null obj would not pass to the BlogList which will cause an error . to fix this and 
            condition is used . if blogs == false then the second condition will not execute because of '&&(AND)' */}
        </div>
    );
}

export default Home;