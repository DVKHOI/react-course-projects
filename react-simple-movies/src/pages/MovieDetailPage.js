import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher } from "../config";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=
//
const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="">
      {data && (
        <div className="w-full h-[600px] relative ">
          <div className="absolute inset-0 bg-black overlay bg-opacity-70"></div>
          <div
            className="w-full h-full bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
            }}
          ></div>
          <div className="max-w-[1200px] w-full h-[400px] -mt-[200px] z-10 relative mx-auto mb-10">
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              className="object-cover w-full h-full rounded-lg"
              alt=""
            />
          </div>
          <h1 className="pb-10 text-4xl font-bold text-center text-white">
            {title}
          </h1>
          <div className="flex items-center justify-center pb-10 gap-x-5">
            {genres.length > 0 &&
              genres.map((item) => (
                <span
                  className="px-6 py-3 text-[#7D6AFF] border rounded-full border-[#7D6AFF]"
                  key={item.id}
                >
                  {item.name}
                </span>
              ))}
          </div>
          <p className="mx-auto text-sm leading-5 max-w-[800px] pb-10">
            {overview}
          </p>
          <MovieCredits></MovieCredits>
          <MovieVideos></MovieVideos>
          <MovieSimilar></MovieSimilar>
        </div>
      )}
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!data || cast.length <= 0) return null;

  return (
    <>
      <h2 className="py-10 pb-10 text-3xl font-medium text-center">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div key={item.id} className="w-full pb-10 cast-item">
            <img
              className="w-full h-[350px] object-cover rounded-lg mb-2"
              src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
              alt=""
            />
            <p className="text-2xl font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(data);
  return (
    <div className="py-10">
      {results.slice(0, 1).map((item) => (
        <div key={item.id}>
          <h3 className="inline-block p-3 mb-1 rounded-md bg-secondary">
            {item.name}
          </h3>
          <div className="w-full aspect-video">
            <iframe
              width="1131"
              height="636"
              src={`https://www.youtube.com/embed/${item.key}`}
              title={`${item.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="object-fill w-full h-full"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  console.log(" data", results);
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl font-medium">Similar Movie</h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
