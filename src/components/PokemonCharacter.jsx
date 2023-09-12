
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { PokemonDetailsContext, ShowModalContext } from '../App';

export const PokemonCharacter = ({url}) => {
    const {setShowModal} = useContext(ShowModalContext);
    const {setPokemonDetails} = useContext(PokemonDetailsContext);
    const [info, setInfo] = useState({});
    const fetchPokemonInfo = async() =>{
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data[0]);
            setInfo(data[0]);
        }
        catch (error) {
            console.log("error");
        }

    }
    const knowMoreHandler = ()=>{
        setShowModal(true);
        setPokemonDetails(info);
    }
    useEffect(() =>{
        fetchPokemonInfo();
    }, []);
  return (
    <section className={`pokemon-card ${info.type}`}>
        <div className='number'>{info.id}</div>
        <img src={info.image} alt={`image of ${info.name}`} />
        <div className='char-name'>{info.name}</div>
        <div className='char-type'>Type: {info.type}</div>
        <button className={`know-more ${info.type}-button`} onClick={knowMoreHandler}>Know More...</button>
    </section>
  )
}


