import {useEffect, useState} from 'react'
import MovieDetails from './MovieDetails.js'

export default function MovieCard(props) {
    const [movieDetails, setMovieDetails] = useState([])
    const [movieProdComps, setMovieProdComps] = useState([])
    const [movieProdImgs, setMovieProdImgs] = useState([])

    async function fetchMovieDetails(id) {
        let moreInfoBtn = document.getElementById(`${id}-button`)
        moreInfoBtn.classList.toggle('active');
        let moreInfoActive = moreInfoBtn.classList.contains('active')
        let timeoutMS = 0

        if ( moreInfoActive && !movieDetails[id] ) {
            const movieApi = `${props.apiRoot}/movie/${id}?api_key=${props.apiKey}`
            // timeoutMS = 100
            try {
                const res = await fetch(movieApi);
                const data  = await res.json();
                setMovieDetails({...movieDetails, [id]: [data]})
                // setMovieProdComps({...movieProdComps, [id]: data.production_companies.filter(n => n.logo_path).map(n => n.name)})
                // setMovieProdImgs({...movieProdImgs, [id]: data.production_companies.filter(n => n.logo_path).map(n => n.logo_path)})
            }catch(err){
                console.error(err);
            }
        }
        let moreInfoDiv = moreInfoBtn.nextElementSibling;
        if (moreInfoDiv.style.maxHeight){
            moreInfoDiv.style.maxHeight = null;
        } else {
            moreInfoDiv.style.maxHeight = moreInfoDiv.scrollHeight + "px";
        }

        // setTimeout(() => {  
        //     if (moreInfoDiv.style.maxHeight){
        //         moreInfoDiv.style.maxHeight = null;
        //     } else {
        //         moreInfoDiv.style.maxHeight = moreInfoDiv.scrollHeight + "px";
        //     }
        // }, timeoutMS)
    }

    return (
        <div className="movie-tiles">
            {props.movies.map(movie => (
                <div key={movie.id} className="movie-tile">
                    <div className="movie-tile-container">
                        <h3>{movie.title}</h3>
                        <div className="movie-tile-details">
                            <img 
                                src= {`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
                                alt={movie.title + ' poster'}
                                className={movie.poster_path ? 'movie-poster' : 'hide'}
                            />
                            <p className="font-small">
                                <label>Release Date: </label> 
                                {movie.release_date ? 
                                    new Intl.DateTimeFormat('en-us', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                    }).format(new Date(movie.release_date))
                                : movie.release_date
                                }
                            </p>
                            <p className="font-small"><label>Rating:</label> {movie.vote_average}</p>
                            <p className="movie-desc"><label>Description</label><br />{movie.overview}</p>

                            <button 
                                className='movie-tile-details_button' 
                                id={`${movie.id}-button`} 
                                onClick={() => fetchMovieDetails(movie.id)}
                                >More Info 
                                <span className="plus"><i className="icon-plus"></i></span>
                                <span className="minus"><i className="icon-minus"></i></span>
                            </button>
                            <MovieDetails 
                                movieId={movie.id} 
                                movieDetails={movieDetails[movie.id]}
                                movieProdComps={movieProdComps[movie.id]}
                                // movieProdImgs={movieProdImgs[movie.id]}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}