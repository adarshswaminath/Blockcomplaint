import {React,useState} from "react";
// components
import Register from "./Register";
import Search from "./Search";
import Update from "./Update";
import Admin from "./Admin";
import { ConnectWallet } from "@thirdweb-dev/react";
import { BrowserRouter as Router,
        Routes,
        Route,
        Link } from "react-router-dom";


function Navbar() {


  return (
   <Router>
     <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/register">Register Complaint</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/update">Update</Link>
              </li>
              <li><Link to='/admin'>Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <span className="btn btn-ghost normal-case text-xl text-white">
            <Link to='/'>BlockComplaints</Link>
          </span>
        </div>
        <div className="navbar-end">
          <Link to='/search'>
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/search' element={<Search/>}/>
        <Route exact path='/update' element={<Update/>}/>
        <Route exact path='/admin' element={<Admin/>}/>
      </Routes>
    </div>
   </Router>
  );
}

function Home() {
    return(
        <div className="p-6 flex justify-center items-center h-screen">
            <div className="p-6 bg-primary rounded-lg">
              <h1 className="text-white text-2xl">Welcome to the BlockComplaints</h1>
            </div>
        </div>
    )
}

export default Navbar;
