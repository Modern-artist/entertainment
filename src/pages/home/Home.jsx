import "./home.scss";
import { React, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import imdb from "../../assets/imdblogo.png";
import Footer from "../../components/footer/Footer";

import Navbar from "../../components/Navbar/Navbar";
import NavDown from "../../components/NavDown/NavDown";
import Banner from "../../components/banner/Banner";
import MoviesSec from "../../components/moviesSec/MoviesSec";
import MobNav from "../../components/mobNavdown/MobNav";
const Home = () => {
  const [popular, setPopular] = useState([]);

  //api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US

 var genres = [
   { title: "top_rated" },
   { title: "now_playing" },
   { title: "upcoming" },
 ];

 const [category, setcategory] = useState("movie")
const changeGenre = (type="movies")=>{
 setcategory(type)
}
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopular(data.results));
  }, []);
  return (
    <div>
      <Navbar />
      {/* <MobNav /> */}
      {/* <div className="heropg"> */}
      {/* <div className="heading">
          <h1>
            The <span>Ultimate</span> Source of <span>ENTERTAINMENT</span>.
          </h1>
          <div className="discoverBtn">
            <RiCompassDiscoverLine size={"3.6rem"} /> <span>DISCOVER NOW!</span>{" "}
          </div>
        </div> */}
      <div className="poster">
        <Carousel
          autoFocus={true}
          showThumbs={false}
          autoPlay={true}
          inti={true}
          transitionTime={0}
          interval={3000}
          infiniteLoop={true}
          showStatus={true}
          // stopOnHover={true}
          // animationHandler={fade}
        >
          {popular.map((movie) => (
            <Link style={{ textDecoration: "none", color: "white" }}>
              <div className="posterImage">
                <div className="grad"></div>
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                />
              </div>
              <div className="heading">
                <h1>
                  The <span>Ultimate</span>
                  <br></br> Source of <br></br>
                  <span>ENTERTAINMENT</span>.
                </h1>
                {/* <button><RiCompassDiscoverLine/> DISCOVER NOW!</button> */}
              </div>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/movie/${movie.id}`}
              >
                <div className="posterImage__overlay">
                  <div className="posterImage__title">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className="posterImage__runtime">
                    <div className="imlogo">
                      <img src={imdb} alt="" />
                    </div>
                    <span>&nbsp;</span>
                    <span className="posterImage__rating">
                      <b>{movie ? movie.vote_average : ""}</b>
                    </span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    {movie ? movie.release_date : ""}
                  </div>
                  <div className="posterImage__description">
                    {movie ? movie.overview : ""}
                  </div>
                </div>
              </Link>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="backImg">
        <div className="grad"></div>
        {/* <img src={backGrounds} alt="" /> */}
      </div>
      {/* </div> */}
      <NavDown callbackFunction={changeGenre} />
      <Banner />
      {genres.map((x) => (
        <MoviesSec title={x.title} category={category} />
      ))}
      {/* <MoviesSec /> */}
      <Footer />
    </div>
  );
};

export default Home;
