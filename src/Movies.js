import React, { useState, useEffect } from "react";
import axios from "axios";
import img from "./assets/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
function Movie(props) {
  return (
    <div className="movie">
      <div className="movie_info">
        <div className="movie_info-imgbox">
          <img src={props.img} className="movie_info-img" />
        </div>
        <div className="movie_info-dis">
          <div className="movie_info-box">
            <h3 className="head">Name</h3>
            <p className="name">{props.name}</p>
          </div>
          <div className="movie_info-box">
            <h3 className="head">Genre</h3>
            <p className="name">{props.genre}</p>
          </div>
          <div className="movie_info-box">
            <h3 className="head">Rating</h3>
            <p className="name">{props.rating}</p>
          </div>
          <div className="movie_info-box">
            <h3 className="head">premiered</h3>
            <p className="name">{props.prem}</p>
          </div>
        </div>
      </div>
      <div className="movie_info-sum">
        <p>{props.summary}</p>
      </div>
      <div className="user_info-box2">
        <div className="detail">
          <p className="detail_head">Movie Name</p>
          <p className="detail_text">{props.name}</p>
        </div>
        <div className="detail">
          <p className="detail_head">User Name</p>
          <input type="text" className="detail_text" />
        </div>
        <div className="detail">
          <p className="detail_head">Email</p>
          <input type="email" className="detail_text" />
        </div>
        <div className="detail">
          <p className="detail_head">Phone Number</p>
          <input type="telephone" className="detail_text" />
        </div>
        <div className="detail">
          <p className="detail_head">No. of seats</p>
          <input type="number " className="detail_text" />
        </div>
      </div>
      <div className="btn-box">
        <button type="" className="btn">
          Book Now !
        </button>
      </div>
    </div>
  );
}
function Card(props) {
  return (
    <div className="card" onClick={props.Clicked}>
      <div className="card_img-box">
        <img src={props.img} alt="" className="card_img" />
      </div>
      <div className="card_info">
        <h3 className="name">{props.name}</h3>
        <div className="card_info-box">
          <h4 className="head">Genre :</h4>
          <p className="para">{props.genre}</p>
        </div>
        <div className="card_info-box">
          <h4 className="head">Lang :</h4>
          <p className="para">{props.lang}</p>
        </div>
        <div className="card_info-box">
          <h4 className="head">Rating :</h4>
          <p className="para">{props.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default function User() {
  const Dispatch = useDispatch();
  const [movieList, setMovieList] = useState([]);
  const { name, genres, image, rating, summary, premiered, active } =
    useSelector((state) => state.custom);
  // const { medium, original } = image;
  // const { average } = rating;
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((responseData) => {
        const loadedTask = responseData.data;
        setMovieList(loadedTask);
        Dispatch({
          type: "updateActive",
        });
      });
  }, []);
  console.log(movieList);
  // const { score, show } = movieList;
  // console.log(show, "hey");
  console.log(name, image, "hey");
  const listMovie = movieList.map((movie) => {
    return (
      <Card
        name={movie.show.name}
        genre={movie.show.genres}
        lang={movie.show.language}
        rating={movie.show.rating.average ? movie.show.rating.average : "N/A"}
        img={movie.show.image.original}
        Clicked={() => {
          Dispatch({
            type: "updateData",
            aRT: movie.show.averageRuntime,
            gen: movie.show.genres,
            id: movie.show.id,
            name: movie.show.name,
            img: movie.show.image.original,
            lang: movie.show.language,
            prem: movie.show.premiered,
            rate: movie.show.rating.average,
            sum: movie.show.summary,
            url: movie.show.url,
          });
        }}
      />
    );
  });
  // console.log(active, "hey");
  return (
    <div>
      <div className="mvi_list-box">{listMovie}</div>
      <div className="mvi_info">
        {active ? (
          <Movie
            name={name}
            genre={genres}
            rating={rating ? rating : "N/A"}
            summary={summary}
            img={image}
            prem={premiered}
          />
        ) : (
          <h1 className="heading">Select movie first !!</h1>
        )}
      </div>
    </div>
  );
}
