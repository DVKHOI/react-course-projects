import { Fragment } from "react";
import { NavLink } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <header className="flex items-center justify-center text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
    </Fragment>
  );
}

export default App;
