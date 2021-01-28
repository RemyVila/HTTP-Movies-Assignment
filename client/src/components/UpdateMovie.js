import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";


const initialValue = {
    id: '',
    title: '',
    director: ' ',
    metascore: '',
    stars: [],
  }



const UpdateMovie = () => {

    const [item, setItem ] = useState(initialValue);
    const { push } = useHistory();
    const { id } = useParams();
 
    useEffect(()=>{
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res=>{
            setItem(res.data);
            console.log(res.data)
          })
          .catch(err=>{
            console.log(err);
          });
      }, [id]);



    const changeHandler = (event) => {
        setItem({
            ...item, 
            [event.target.name]: event.target.value
        })

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('clicked')
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then((res)=>{
                push(`/movies/${id}`)
                console.log(res)
            })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: 
                    <input
                        type = 'text'
                        name = 'title'
                        onChange={changeHandler}
                        value={item.title}
                    />
                </label>

                <label>
                    Director:
                    <input
                        type = 'text'
                        name = 'director'
                        onChange={changeHandler}
                        value={item.director}
                    />
                </label>

                <label>
                    MetaScore:
                    <input
                        type = 'text'
                        name= 'metascore'
                        onChange={changeHandler}
                        value={item.metascore}
                    />
                </label>

                <label>
                    Stars:
                    <input
                    type = 'text'
                    name = 'stars'
                    onChange={changeHandler}
                    value={item.stars}
                    />
                </label>

                <button>Done</button>
            </form>
        </div>
    )
}

export default UpdateMovie;