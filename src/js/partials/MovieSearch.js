import {useEffect, useState} from 'react'
import MovieCard from './MovieCard.js'

export default function MovieSearch() {
    const apiRoot = 'https://api.themoviedb.org/3'
    const apiKey = '47117464b881c6659bf21cb0510534bb'
    const [query, setQuery] = useState('Star Trek')
    const [movies, setMovies] = useState([])
    const [origMovies, setOrigMovies] = useState([])
    const [sortType, setSortType] = useState('best-match')
    const [sortDirection, setSortDirection] = useState('')
    const [movieCount, setMovieCount] = useState(0)

    function searchMovies(e) {
        e.preventDefault()
        if( !query ) {
            alert('Please enter a movie title.')
            return false
        }
        const apiUrl = `${apiRoot}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (data) => {
                    setMovies(data.results.filter(m => m.overview.length>0 || m.poster_path))
                    setOrigMovies(data.results.filter(m => m.overview.length>0 || m.poster_path))
                },
                (error) =>{
                    setMovies(error)
                }
            )
    }

    function setSortTypes(val) {
        const tmpArr = val.split(',')
        setSortDirection(tmpArr[1])
        setSortType(tmpArr[0])
    }

    useEffect(() => {
        setMovieCount(origMovies.length)
    }, [origMovies])

    useEffect(() => {
        const sortMovies = type => {
            const types = {
                bestMatch: 'best-match',
                title: 'title',
                date: 'release_date',
                rating: 'vote_average'
            }
            
            const sortProperty = types[type]
            const direction = sortDirection
            let sorted = []
            
            if( sortProperty === 'best-match') {
                sorted = origMovies
            } else if( sortProperty === 'title' ) {
                sorted = [...movies].sort(function(a,b) {
                    let nameA = a.title.toUpperCase();
                    let nameB = b.title.toUpperCase();
                    if ( direction === 'Z') {
                        if(nameA > nameB ) {
                            return -1
                        }
                        if(nameA < nameB) {
                            return 1
                        }
                        return 0
                    } else {
                        if(nameA < nameB ) {
                            return -1
                        }
                        if(nameA > nameB) {
                            return 1
                        }
                        return 0
                    }
                })
            } else if (sortProperty === 'vote_average') {
                if(direction === 'Z') {
                    sorted = [...movies].sort((a,b) => a[sortProperty] - b[sortProperty])
                } else {
                    sorted = [...movies].sort((a,b) => b[sortProperty] - a[sortProperty]) 
                }
            } else if ( sortProperty === 'release_date') {
                sorted = [...movies].sort(function(a,b) {
                    if( direction === 'Z' ) {
                        return new Date(b.release_date) - new Date(a.release_date)
                    }
                    return new Date(a.release_date) - new Date(b.release_date)
                })
            }
            setMovies(sorted)
        }
        sortMovies(sortType)
    }, [sortType,sortDirection])

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={searchMovies}>
                <div className="searchbox">
                    <label className="search-label" htmlFor="query">What movie are you looking for?</label>
                    <input
                        className="search-input"
                        type="text"
                        name="query"
                        placeholder="e.g., Pulp Fiction"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    >
                    </input>
                    <button className="search-button" type="submit">Search</button>
                </div>
            </form>
            <div className="search-results">
                <div className={ query !== '' ? 'search-results-header' : 'hide'}>
                    <div className="search-results-header--left">
                        <h2>
                        {movies[0] ? 
                            `Showing ${movieCount} ${movies.length > 1 ? 'Results' : 'Result'}` : 
                            `No movies were found for your search: ${query}`
                        }
                        </h2>
                    </div>
                    <div className={`search-results-header--right ${movies.length > 1 ? '' : 'hide'}`}>
                        <label>Sort by: </label>
                        <select onChange={(e) => setSortTypes(e.target.value)}>
                            <option value='bestMatch,A'>Best Match</option>
                            <option value='title,A'>Title A-Z</option>
                            <option value="title,Z">Title Z-A</option>
                            <option value="date,A">Date (Ascending)</option>
                            <option value="date,Z">Date (Decending)</option>
                            <option value="rating,A">Rating (Ascending)</option>
                            <option value="rating,Z">Rating (Decending)</option>
                        </select>
                    </div>
                </div>                
                <MovieCard 
                    movies={movies} 
                    apiRoot={apiRoot} 
                    apiKey={apiKey}
                />
            </div>
        </div>
    )
}