import React, { useEffect, useState } from "react"
import './App.css';
import Axios from "axios"

function App() {

  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("")


  useEffect(() => {
    Axios.get("https://sql-react-moviereview.herokuapp.com/api/get").then((response) => {
      console.log(response.data);
      setMovieList(response.data)
    })
  }, []);

  const submitReview = () => {
    Axios.post("https://sql-react-moviereview.herokuapp.com/api/insert", {
      movieName: movieName,
      movieReview: review
    });
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };
  const deleteReview = (movie) => {
    Axios.delete(`https://sql-react-moviereview.herokuapp.com/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put("https://sql-react-moviereview.herokuapp.com/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
setNewReview("");
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>

        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => { setMovieName(e.target.value) }} />

        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => { setReview(e.target.value) }} />

        <button onClick={() => submitReview()}>Submit</button>

        {movieReviewList.map((val) => {
          return <div className="card">
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>

            <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e) => { setNewReview(e.target.value) }} />

            <button onClick={() =>{updateReview(val.movieName)} }>Update</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
