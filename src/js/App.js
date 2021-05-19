import '../css/Main.min.css';
import Header from './partials/Header.js'
import MovieSearch from './partials/MovieSearch.js'
import Footer from './partials/Footer.js'

function App() {
  return (
    <div className="App">
      <Header />
      <MovieSearch />
      <Footer />
    </div>
  );
}

export default App;