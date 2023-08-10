import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {PokemonCharacter} from './components/PokemonCharacter';

function App() {
  const [isloading, setisLoading] = useState(false);
  const [pokemonList, setPokemonlist] = useState({});
  const fetchPokemonData = async() =>{
    try{
      setisLoading(true);
    const res = await fetch("https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1")
    const data =await res.json();
    console.log("data", data[0]);
    setPokemonlist(data[0]);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setisLoading(false);
    }
    
  };
  useEffect(() =>{
    fetchPokemonData();
  },[]);

  return (
    <main>
      <header className='header-container'>
        <h2>Pokemon</h2>
        <h2>KingDom</h2>
      </header>
      {isloading?(<div>Loading....</div>):(
        <section className='card-container'>
          {pokemonList.results && pokemonList.results.map(({name, url}, i)=>{
            return <PokemonCharacter url={url} key={i} />
          })}
        </section>
      )}
      
    </main>
  );
}

export default App;
