import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './components/UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] =useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(()=> {
    axios
    .get("http://localhost:5000/api/movies")
    .then(res => setMovies(res.data))
    .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
      path="/update-movie/:id" 
      render={props=> (
        <UpdateForm {...props} movies={movies} />
      )}/>
    </>
  );
};

export default App;
