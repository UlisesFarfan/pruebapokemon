import { combineReducers } from "@reduxjs/toolkit";
import PokemonSlice from "../slices/Pokemon";
export type StateGlobalType = {
};

const rootReducer = combineReducers({
  pokemon: PokemonSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
