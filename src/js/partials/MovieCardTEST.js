import {useState, useEffect} from 'react'

export default function MovieCard(props) {
    const [movieDetails, setMovieDetails] = useState([])
    const [movieWatch, setMovieWatch] = useState([])
    const [movieBuy, setMovieBuy] = useState([])
    const [movieRent, setMovieRent] = useState([])

    function getMovieDetails() {
        const movieApi = 'https://api.themoviedb.org/3/movie/13475?api_key=47117464b881c6659bf21cb0510534bb'

        fetch(movieApi)
        .then(res => res.json())
        .then(
            (data) => {
                setMovieDetails(data.results)
            },
            (error) =>{
                setMovieDetails(error)
            }
        )
    }

    function getWatchProviders() {
        const movieApi = 'https://api.themoviedb.org/3/movie/188927/watch/providers?api_key=47117464b881c6659bf21cb0510534bb'

        fetch(movieApi)
        .then(res => res.json())
        .then(
            (data) => {
                // console.log('Response from main API: ',data)
                // console.log('Home Data: ',data.results.US)
                setMovieWatch(data.results.US)
                setMovieRent(data.results.US.rent)
                setMovieBuy(data.results.US.buy)
                console.log(data.results.US.rent)
                console.log(data.results.US.buy)
            },
            (error) =>{
                setMovieWatch(error)
            }
        )
    }


    return (
        <div>
            <label>Movie Title</label>

            <p><a href="#" onClick={getWatchProviders}>Get Movie Details</a></p>

            {movieRent.map((movie, i) => (
                <p key={i}>
                    <img src={`https://image.tmdb.org/t/p/w45/${movie.logo_path}`} />
                </p>
            ))}
        </div>
    )
}