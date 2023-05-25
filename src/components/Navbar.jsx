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
import image from "./hero.png"


function Navbar() {


  return (
   <Router>
     <div>
      {/* navbar opens  */}
      <div className="navbar flex justify-between p-2 border border-gray-200">
        <div className="logo">
          <h1 className="text-2xl">
            <Link to="/">BCRS</Link>
          </h1>
        </div>
        <div className="flex gap-3">
          <Link to="/register">Register</Link>
          <Link to="/search">Search</Link>
          <Link to="/update">Update</Link>
          <Link to='/admin'>Admin</Link>
        </div>
      </div>
      {/* navbar closes */}
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
      <section class="bg-white">
      <div class="grid h-screen px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div class="mr-auto place-self-center lg:col-span-7">
              <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Blockchain Complaint Management System</h1>
              <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
              <Link to="/register" class="inline-flex w-80 items-center justify-center py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                  Register
              </Link> 
          </div>
          <div class="lg:mt-0 lg:col-span-5 lg:flex">
              <img src={image} alt="mockup"/>
          </div>                
      </div>
  </section>
    )
}

export default Navbar;
