import "./App.css"
import pokelogo from "./assets/pokemons.svg"
import { useAppDispatch, useAppSelector } from './hook/useRedux';
import { useEffect, useState } from 'react';
import { GetPokemons } from './redux/async/pokemonAsync';
import { StoreSlice } from './interface/store.interface';

const types = [
  "Normal",
  "Grass",
  "Fire",
  "Water",
  "Bug",
  "Electric",
  "Rock",
  "Ghost",
  "Poison",
  "Psychic",
  "Fighting",
  "Ground",
  "Dragon",
  "Reset",
];

function App() {
  const dispatch = useAppDispatch();

  const { pokemons } = useAppSelector((store: StoreSlice) => store.pokemon);
  const [data, setData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  const [order, setOrder] = useState<string>('id-asc');

  useEffect(() => {
    dispatch(GetPokemons());
  },[])

  useEffect(() => {
    if (pokemons !== null) {
      setData(pokemons);
    }
  }, [pokemons])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = pokemons?.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    setData(filteredData || []);
    setSearch(searchValue);
  };

  const handleTypeFilter = (type: string) => {
    if (type === "Reset" && pokemons !==null) {
      setData(pokemons);
    } else {
      const filteredData = pokemons?.filter(
        (pokemon: any) => pokemon.types[0].type.name === type.toLocaleLowerCase()
      );
      setData(filteredData || []);
    }
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
    let sortedData = [...data];
    switch (e.target.value) {
      case 'id-asc':
        sortedData.sort((a, b) => a.id - b.id);
        break;
      case 'id-dsc':
        sortedData.sort((a, b) => b.id - a.id);
        break;
      case 'base-experience-asc':
        sortedData.sort((a, b) => a.base_experience - b.base_experience);
        break;
      case 'base-experience-dsc':
        sortedData.sort((a, b) => b.base_experience - a.base_experience);
        break;
      default:
        break;
    }
    setData(sortedData);
  };

  return (
    <div className="app-container">
      <div>
        <img src={pokelogo} alt="" />
      </div>
      <div className="input-section">
        <div className="input-container">
          <input
            className="input-search"
            type="text"
            onChange={(e) => handleSearch(e)}
            value={search}
          />
          <p className="input-description">
            Use this input to search for any pokemon. In an instant.
          </p>
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-type-container">
          <div className="filter-title">
            <h2>Filter by type:</h2>
          </div>
          <div className="filter-types">
            {types.map((el: string, index) => {
              return (
                <button
                  className={`filter-type ${el.toLocaleLowerCase()}`}
                  key={index}
                  onClick={() => handleTypeFilter(el)}
                >
                  {el}
                </button>
              );
            })}
          </div>
        </div>
        <div className="filter-order">
          <select
            name="order"
            id="order"
            className="order-type"
            value={order}
            onChange={handleOrderChange}
          >
            <option value="id-asc" className="order-type">
              ID ASC
            </option>
            <option value="id-dsc" className="order-type">
              ID DSC
            </option>
            <option value="base-experience-asc" className="order-type">
              Base Experience ASC
            </option>
            <option value="base-experience-dsc" className="order-type">
              Base Experience DSC
            </option>
          </select>
        </div>
      </div>
      <div className="pokemons-section">
        {data?.map((el: any, index) => {
          return (
            <div key={index} className="pokemon-card">
              <div className="pokemon-img">
                <img src={el.sprites.front_default} alt={el.name} />
              </div>
              <div className="pokemon-data">
                <span>#{el.id}</span>
                <span>EXP: {el.base_experience}</span>
              </div>
              <span className="pokemon-name">{el.name}</span>
              <span className={`pokemon-type ${el.types[0].type.name}`}>
                {el.types[0].type.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App
