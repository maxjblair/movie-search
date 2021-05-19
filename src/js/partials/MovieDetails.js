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
            <p><strong>{movieDetails.tagline}</strong></p>
            <p><label>Genre(s):</label> {genres}</p>
            <p><label>Rating Votes:</label> {`${numberFormat.format(movieDetails.vote_count)}`}</p>
            <p><label>Runtime:</label> {`${Math.round(movieDetails.runtime/60)} hours, ${movieDetails.runtime%60} minutes`}</p>
            <p><label>Budget:</label> {moneyFormat.format(movieDetails.budget)}</p>
            <p><label>Revenue:</label> {moneyFormat.format(movieDetails.revenue)}</p>
            {/* <p className={movieProdImgs && movieProdImgs.length > 0 ? '' : 'hide' }><label>Production Companies:</label></p>
            <div>
                {movieProdImgs && movieProdImgs.length > 0 ? movieProdImgs.map((img,i) => (
                    <img className='production-images' key={`${props.movieId}-${i}`} src={`https://image.tmdb.org/t/p/w45/${img}`} alt={movieProdComps[i]} />
                )) : ''
                }
            </div> */}
        </div>
    )
}