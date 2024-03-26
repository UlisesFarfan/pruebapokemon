import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetPokemons = createAsyncThunk(
  "pokemons/getpokemons",
  async (_, thunkApi) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
        headers: {
          Accept: "application/json",
        },
      });
      
      const pokemonPromises = data.results.map(async (el: any) => {
        const { data } = await axios({
          method: "GET",
          url: "https://pokeapi.co/api/v2/pokemon/" + el.name,
          headers: {
            Accept: "application/json",
          },
        });
        return data;
      });

      const pokemonsStats = await Promise.all(pokemonPromises);

      return pokemonsStats;
    } catch (error: any) {
      throw thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
