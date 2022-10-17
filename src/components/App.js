import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { data as moviesList } from '../data';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(moviesList));
    // const { store } = this.props;
    // store.subscribe(() => {
    //   console.log("Updated")
    //   this.forceUpdate();
    // })

    // store.dispatch(addMovies(data))
    // console.log("CDM", store.getState().movies)
  }

  isMovieFavourite = (movie) => {
    // const root_reducer = this.props.store.getState().rootReducer;
    // const { movies } = root_reducer;
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      // found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (value) => {
    this.props.dispatch(setShowFavourites(value))
  }

  render() {
    // const root_reducer = this.props.store.getState().rootReducer;
    // const { movies, search } = root_reducer;
    const { movies, search } = this.props; // will return { movies: {}, search: []}
    // const { list, favourites, showFavourites } = movies;
    const { list, favourites, showFavourites } = movies;
    console.log("Movie state", list, favourites)
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search} />
        <div className='main'>
          <div className='tabs'>
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className='list'>
            {
              displayMovies.map((movie, index) => (
                <MovieCard
                  dispatch={this.props.dispatch}
                  movie={movie}
                  key={movie.imdbID}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              ))
            }
          </div>
          {displayMovies.length === 0 ? <div className='no-movies'>No movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }

// // export default AppWrapper;

function callback(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;