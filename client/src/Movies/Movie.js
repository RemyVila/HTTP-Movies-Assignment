import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useHistory, useParams } from 'react-router-dom';


function Movie({ addToSavedList }) {


const { push } = useHistory();

  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = (id) => {
 push('/')
};

const handleEditMovie = () => {
  fetchMovie(params.id)
  window.location.href = `/update-movie/${params.id}`
}

const handleDelete = () => {
  fetchMovie(params.id)
  axios 
  .delete(`http://localhost:5000/api/movies/${params.id}`)
  .then((res)=>{
    console.log(res)
    window.location.href = `/`
  })
  .catch((err) =>{
    console.log(err)
  })
  }


  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button className="save-button" onClick={saveMovie}>Save</button>
      <button onClick={handleEditMovie}>Edit Movie</button>
      <button onClick={handleDelete}>Delete Movie</button>
    </div>
  );
}

export default Movie;