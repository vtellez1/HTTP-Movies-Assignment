import React, { useState, useEffect } from 'react'
import axios from 'axios'

  const initialMovie = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    }

const UpdateForm = props => {
 const [movie, setMovie] = useState(initialMovie);

 useEffect(() => {
     const movieToEdit = props.movies.find(
         e => `${e.id}` === props.match.params.id
     );
     console.log(props.movies, movieToEdit);
     if (movieToEdit){
         setMovie(movieToEdit);
     }
 }, [ props.movies, props.match.params.id ]);


 const changeHandler = e => {
     setMovie({
         ...movie,
         [e.target.name]: e.target.value
     });
 };

 const handleSubmit = e => {
     e.preventDefault();
     axios
     .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
     .then(res => {
         setMovie(res.data);
         props.history.push(`/movies/${movie.id}`)
     })
     .catch(err => console.log(err))
 }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder= "Title" onChange={changeHandler} value={movie.title}/>

                <input type="text" name="director" placeholder= "Director" onChange={changeHandler} value={movie.director}/>

                <input type="number" name="metascore" placeholder= "Metascore" onChange={changeHandler} value={movie.metascore}/>

                <input type="string" name="stars" placeholder= "Stars" onChange={changeHandler} value={movie.stars}/>

                <button>Update</button>
            </form>
        </div>
    )
}
export default UpdateForm;