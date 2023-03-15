import React, { useState } from 'react';


function Search() {
  const [address,setAddress] = useState('')
  const handleAddress = (e) => setAddress(e.target.value) 
  return (
    <div className="grid place-content-center p-8 m-8">
      <h1 className="mx-auto text-white text-2xl mb-2">Search</h1>
      <div className="p-8 w-96 rounded-lg gap-3 grid">
        <input type="text" className="h-12 p-3 mx-auto" placeholder="Address to Search" />
        <button className="btn text-white font-bold rounded mx-auto" onClick={handleAddress}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
