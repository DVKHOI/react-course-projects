import { Fragment } from "react";
import { NavLink } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <header className="flex items-center justify-center mb-20 text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <section className="banner h-[500px] page-container pb-10">
        <div className="relative w-full h-full bg-white rounded-lg">
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
          <img
            className="object-cover w-full h-full rounded-lg "
            src="https://www.cnet.com/a/img/resize/3d224f21651f9747f611bdaaa9a02c16486c71a4/hub/2021/12/24/aa266356-f4e0-4498-a799-f827efe36ed5/spider-man-no-way-home-new-poster-1200.jpg?auto=webp&fit=crop&height=675&width=1200"
            alt=""
          />
          <div className="absolute w-full text-white left-5 bottom-5">
            <h2 className="mb-5 text-5xl font-bold">Spider man: No Way Home</h2>
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
                Watch Now
              </button>
              <button className="px-4 py-2 text-3xl font-medium bg-gray-500 rounded-lg">
                +
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-10 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          Now playing
        </h2>
        <div className="grid grid-cols-4 gap-10 movie-list">
          <div className="p-3 rounded-lg movie-card bg-slate-800">
            <img
              className="w-full h-[250px] rounded-lg object-cover mb-3"
              src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F05%2Fsony-ceo-tom-rothman-fourth-spider-man-film-updates-tom-holland-zendaya-marvel-mcu-000.jpg?w=960&cbr=1&q=90&fit=max"
              alt=""
            />
            <h3 className="mb-3 text-xl text-white ">Spiderman: Homecoming</h3>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
