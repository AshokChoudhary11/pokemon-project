import "./App.css";
import MainContainer from "./components/MainContainer";
import { createContext, useEffect, useState } from "react";
import { PokemonCharacterDetails } from "./components/PokemonCharacterDetails";

export const ShowModalContext = createContext();
export const PokemonDetailsContext = createContext();
function App() {
  const [showModal, setShowModal] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState({});

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <main>
      <ShowModalContext.Provider value={{ setShowModal }}>
        <PokemonDetailsContext.Provider
          value={{ pokemonDetails, setPokemonDetails }}
        >
          <MainContainer />
          {showModal && (
            <div className="modal-wrapper">
              <PokemonCharacterDetails />
            </div>
          )}
        </PokemonDetailsContext.Provider>
      </ShowModalContext.Provider>
    </main>
  );
}

export default App;
