import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = (props) => {

  const { push } = useHistory();
  const [movie, setMovie] = useState(initialState);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = (e) => {
      e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        push("/");
      })
      .then((err) => {
        console.log(err);
      });
  };

 

  return (
    <div className='form-container'>
      <h2>Add A Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
                <input
                    type='text'
                    name='title'
                    value={movie.title}
                    onChange={handleChange}
                />
        </label>
        <label>
          Director:
                <input
                    type='text'
                    name='director'
                    value={movie.director}
                    onChange={handleChange}
                />
        </label>
        <label>
            Metascore:
                <input
                    type='number'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />
        </label>
        
       
        <button onClick={handleChange} type='submit' value='submit' className='submit-button'>
          Submit Changes
        </button>
      </form>
    </div>
  );
};

export default AddMovie;