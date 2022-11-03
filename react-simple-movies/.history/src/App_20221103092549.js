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
            src="https://www.cnet.com/a/img/resize/3d224f21651f9747f611bdaaa9a02c16486c71a4/hub/2021/12/24/aa266356-f4e0-4498-a799-f827efe36ed5/spider-man-no-way-home-new-poster-1200.jpg?auto=webp&fit=crop&height=675&width=1200"
            alt=""
          />
          <div className="absolute w-full text-white left-5 bottom-5">
            <h2 className="mb-5 text-5xl font-bold">Spider man: No Way Home</h2>
            <div className="flex items-center justify-start gap-x-3">
              <span className="p-2 border border-white rounded-lg">Action</span>
              <span className="p-2 border border-white rounded-lg">
                Adventure
              </span>
              <span className="p-2 border border-white rounded-lg">Drama</span>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
