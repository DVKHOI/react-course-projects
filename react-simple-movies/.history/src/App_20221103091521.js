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
            src="https://ecdn.game4v.com/g4v-content/uploads/2021/09/13003753/game4v-Spider-Man-2-2-1631468272-77.jpg"
            alt=""
          />
        </div>
      </section>
    </Fragment>
  );
}

export default App;
