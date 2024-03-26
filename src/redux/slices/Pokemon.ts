import { createSlice } from "@reduxjs/toolkit";
import { GetPokemons } from "../async/pokemonAsync";

const initialState = {
  pokemons: null,
} as {
  pokemons: Array<any> | null;
};

export const PokemonSlice: any = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPokemons.fulfilled, (state, { payload }) => {
      state.pokemons = payload;
    });
  }
})

export default PokemonSlice.reducer;