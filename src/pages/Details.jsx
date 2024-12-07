import { useLoaderData } from "react-router-dom";

export default function Details(){
    const movie = useLoaderData()
    return (
        <div className= 'w-full md:w-10/12 md:mx-auto p-5' >
            <h1>{movie.title}</h1>
        </div>
    );
}