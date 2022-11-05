import React from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";

import { fetcher } from "../../config";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=00d6e8bb848cf1aab363de510f7d4d22`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, poster_path } = item;
  return (
    <div className="relative w-full h-full bg-white rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        className="object-cover w-full h-full rounded-lg"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt=""
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-5xl font-bold">{title}</h2>
        <div className="flex items-center justify-start mb-5 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-lg">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-lg">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-lg">
            Drama
          </span>
        </div>
        <div className="flex flex-row gap-x-5">
          <button className="px-6 py-2 font-medium rounded-lg bg-primary">
            Watch
          </button>
          <button className="px-4 py-2 text-3xl font-medium bg-gray-500 rounded-lg">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
export default Banner;
