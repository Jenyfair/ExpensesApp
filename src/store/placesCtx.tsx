import { createContext, useReducer } from "react";
import { IPlace } from "../types/place";
import { PlacesActions, Types, placeReducer } from "./placesReducer";

type InitialStateType = {
  places: IPlace[];
};

const initialState = {
  places: [],
};

export const PlacesContext = createContext<{
  state: InitialStateType;
  addPlace: (placeData: IPlace) => void;
  deletePlace: (id: string) => void;
  updatePlace: (placeData: IPlace) => void;
  setPlaces: (places: IPlace[]) => void;
}>({
  state: initialState,
  addPlace: ({}) => null,
  deletePlace: () => null,
  updatePlace: ({}) => null,
  setPlaces: ([]) => null,
});

const placesReducer = (
  { places }: InitialStateType,
  action: PlacesActions
) => ({
  places: placeReducer(places, action),
});

type PlacesContextProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const PlacesContextProvider = ({
  children,
}: PlacesContextProviderProps) => {
  const [state, dispatch] = useReducer(placesReducer, initialState);
  const addPlace = (placeData: IPlace) => {
    dispatch({ type: Types.Add, payload: placeData });
  };
  const setPlaces = (places: IPlace[]) => {
    dispatch({ type: Types.Set, payload: places });
  };
  const deletePlace = (id: string) => {
    dispatch({ type: Types.Delete, payload: { id: id } });
  };
  const updatePlace = (placeData: IPlace) => {
    dispatch({ type: Types.Update, payload: placeData });
  };

  const value = {
    state,
    addPlace,
    deletePlace,
    updatePlace,
    setPlaces,
  };

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
};
