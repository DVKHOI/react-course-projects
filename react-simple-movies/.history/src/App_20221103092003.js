import { Fragment } from "react";
import { NavLink } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <header className="flex items-center justify-center mb-10 text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <section className="banner h-[400px] page-container">
        <div className="relative w-full h-full bg-white rounded-lg">
          <img
            className="object-cover w-full h-full rounded-lg "
            src="https://cdn.akamai.steamstatic.com/steam/apps/1817070/ss_5b5448df07bc74ba236f2c007fd0ec19cc1d22b6.1920x1080.jpg?t=1667406675"
            alt=""
          />
          <div className="absolute w-full text-5xl font-semibold text-white left-5 bottom-5">
            <h2>Spider man 2</h2>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
