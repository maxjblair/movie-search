import {useState} from 'react'
import MovieDetails from './MovieDetails.js'

export default function MovieCard(props) {
    const [movieDetails, setMovieDetails] = useState([])

    async function fetchMovieDetails(id) {
        let moreInfoBtn = document.getElementById(`${id}-button`)
        moreInfoBtn.classList.toggle('active');
        let moreInfoActive = moreInfoBtn.classList.contains('active')

        if ( moreInfoActive && !movieDetails[id] ) {
            const movieApi = `${props.apiRoot}/movie/${id}?api_key=${props.apiKey}`
            try {
                const res = await fetch(movieApi);
                const data  = await res.json();
                setMovieDetails({...movieDetails, [id]: [data]})
            }catch(err){
                console.error(err);
            }
        }
        showHideDetails(id)
    }

    function showHideDetails(id) {
        let moreInfoBtn = document.getElementById(`${id}-button`)
        let moreInfoDiv = moreInfoBtn.nextElementSibling;
        if (moreInfoDiv.style.maxHeight){
            moreInfoDiv.style.maxHeight = null;
            // return false
        } else {
            moreInfoDiv.style.maxHeight = moreInfoDiv.scrollHeight + "px";
        }
    }


/*
    function getMovieDetails(id) = asynch () => {
        let moreInfoBtn = document.getElementById(`${id}-button`)
        let moreInfoDiv = moreInfoBtn.nextElementSibling;

        moreInfoBtn.classList.toggle('active');
        let moreInfoActive = moreInfoBtn.classList.contains('active')

        if ( moreInfoActive && !movieDetails[id] ) {
            //setMoveieDetailsLoading(true)
            const movieApi = `${props.apiRoot}/movie/${id}?api_key=${props.apiKey}`


            try {
                const res = await fetch(movieUrl);
                const data  = await res.json();
                setMovieDetails({...movieDetails, [id]: [data]})
            }catch(err){
                console.error(err);
            }
        }
*/

/*
            fetch(movieApi)
            .then(resA => resA.json())
            .then(
                (data) => {
                    setMovieDetails({...movieDetails, [id]: [data]})
                    setMoveieDetailsLoading(false)
                },
                (error) => {
                    setMovieDetails(error)
                }
            )
        }

        if (moreInfoDiv.style.maxHeight){
            moreInfoDiv.style.maxHeight = null;
            // return false
        } else {
            moreInfoDiv.style.maxHeight = moreInfoDiv.scrollHeight + "px";
        }
    }
*/
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
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}