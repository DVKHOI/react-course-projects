import React from "react";

const MovieCard = () => {
  return (
    <div className="p-3 rounded-lg movie-card bg-slate-800">
      <img
        className="w-full h-[250px] rounded-lg object-cover mb-3"
        src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F05%2Fsony-ceo-tom-rothman-fourth-spider-man-film-updates-tom-holland-zendaya-marvel-mcu-000.jpg?w=960&cbr=1&q=90&fit=max"
        alt=""
      />
      <h3 className="mb-3 text-xl font-bold text-white ">
        Spiderman: Homecoming
      </h3>
      <div className="flex items-center justify-between mb-10 text-sm text-white opacity-50">
        <span>2017</span>
        <span>7.4</span>
      </div>
      <button className="w-full px-6 py-3 font-medium text-white capitalize rounded-lg bg-primary">
        Watch Now
      </button>
    </div>
  );
};

export default MovieCard;
