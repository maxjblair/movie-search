export default function MovieDetails(props) {
    // const movieProdComps = props.movieProdComps
    // const movieProdImgs = props.movieProdImgs

    const movieDetails = props.movieDetails ? props.movieDetails[0] : ''
    const moneyFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

    const numberFormat = new Intl.NumberFormat('en-US')
    const genres = movieDetails ? movieDetails['genres'].map(g => g.name).join(', ') : ''

    return (
        <div id={`${props.movieId}-appended`} className="movie-details-appended">
            <h4>{movieDetails.tagline}</h4>
            <p><label>Genre(s):</label> {genres ? genres : 'NA'}</p>
            <p><label>Rating Votes:</label> {`${numberFormat.format(movieDetails.vote_count)}`}</p>
            <p><label>Runtime:</label> {`${Math.round(movieDetails.runtime/60)} hours, ${movieDetails.runtime%60} minutes`}</p>
            <p><label>Budget:</label> {movieDetails.budget > 0 ? moneyFormat.format(movieDetails.budget) : 'NA'}</p>
            <p><label>Revenue:</label> {movieDetails.revenue > 0 ? moneyFormat.format(movieDetails.revenue) : 'NA'}</p>
            {/* <p className={movieProdImgs && movieProdImgs.length > 0 ? '' : 'hide' }><label>Production Companies:</label></p>
            <div>
                {movieProdImgs && movieProdImgs.length > 0 ? movieProdImgs.map((img,i) => (
                    <img className='production-images' key={`${props.movieId}-${i}`} src={`https://image.tmdb.org/t/p/w45/${img}`} alt={movieProdComps[i]} />
                )) : ''
                }
            </div> */}
            <p><a href={`http://www.themoviedb.org/movie/${movieDetails.id}`} target="_blank" alt="Full Movie Details" rel="noreferrer">Full Details</a></p>
        </div>
    )
}