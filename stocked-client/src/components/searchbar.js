import React, { useState } from 'react'
import { Button, InputGroup } from '@blueprintjs/core';
import './searchbar.css';



export const SearchBar = () => {
  const [query, setQuery] = useState(""); // init to empty string

  function goToTicker(e) {
    let url = `/2021-fall-cs160-pied-piper/#/ticker/${query}`;
    console.log(url)
    window.open(url, "_self");
  }

  const searchButton = (
    <Button
        icon={"search"}
        minimal={true}
        onClick={goToTicker}
        />
  );

  return (
    <div className="search-bar">
      <form onSubmit={ goToTicker }>
        <InputGroup className="search-input"
                    placeholder="Search"
                    leftElement={ searchButton }
                    onChange={(e) => setQuery(e.target.value)}
                    />
      </form>
    </div>
  )
} 