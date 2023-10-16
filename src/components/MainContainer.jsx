// @ts-nocheck
import { useEffect, useState } from "react";
import "../App.css";
import { PokemonCharacter } from "./PokemonCharacter";

function MainContainer() {
  const [isloading, setisLoading] = useState(false);
  const [pokemonList, setPokemonlist] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [searchName, setSearchName] = useState("");

  const fetchPokemonData = async (url) => {
    try {
      setisLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      console.log("data", data[0]);
      setPokemonlist([...pokemonList, ...data[0].results]);
      setNextUrl(data[0].next);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };
  const loadMorePokeMons = () => {
    fetchPokemonData(nextUrl);
  };
  const handleInputChange = (event) => {
    setSearchName(event.target.value);
  };
  const filteredPokemonList = pokemonList.filter((pokemon) => {
    return pokemon.name.startsWith(searchName);
  });
  useEffect(() => {
    fetchPokemonData(
      "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1"
    );
  }, []);
  return (
    <main>
      <header className="header-container">
        <div className="header-part-1">
          <h2>Pokemon &nbsp; KingDom</h2>
          <h2 className="second-h2">Pokemon &nbsp; KingDom</h2>
        </div>
      </header>
      <input
        className="searchPokeemon"
        type="text"
        placeholder="Enter Pokemon name"
        value={searchName}
        onChange={handleInputChange}
      />
      {isloading ? (
        <div>Loading....</div>
      ) : (
        <section className="body-container">
          <section className="card-container">
            {filteredPokemonList.map(({ url, name }) => {
              return <PokemonCharacter url={url} key={name} />;
            })}
          </section>
          <button className="load-more" onClick={loadMorePokeMons}>
            More Pokemons
          </button>
        </section>
      )}
    </main>
  );
}

export default MainContainer;
