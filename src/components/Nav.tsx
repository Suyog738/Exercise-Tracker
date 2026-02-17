const Nav = () => {
  return (

    <div className="w-full bg-base-100 shadow-lg border-b border-base-300">
      
    
      <div className="navbar max-w-7xl mx-auto px-6 py-4">

        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg">
              <li><a>About</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>

          <span className="text-3xl font-bold ml-2">
            Exercise Tracker
          </span>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base">
            <li><a>About</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end">
          <a className="btn bg-sky-600 text-white hover:bg-sky-700 transition px-6 border-none">
            Join us
          </a>
        </div>

      </div>
    </div>
  );
};

export default Nav;
