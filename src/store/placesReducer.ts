import { IPlace } from "../types/place";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Delete = "DELETE",
  Add = "ADD",
  Update = "UPDATE",
  Set = "SET",
}

type PlacePayload = {
  [Types.Add]: IPlace;
  [Types.Update]: IPlace;
  [Types.Delete]: {
    id: string;
  };
  [Types.Set]: IPlace[];
};

export type PlacesActions =
  ActionMap<PlacePayload>[keyof ActionMap<PlacePayload>];

export const placeReducer = (state: IPlace[], action: PlacesActions) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const invertedData = action.payload.reverse();
      return invertedData;
    case "DELETE":
      return [...state.filter((place) => place.id !== action.payload.id)];
    case "UPDATE":
      const updatableItemIndex = state.findIndex(
        (place) => place.id === action.payload.id
      );
      const updatableItem = state[updatableItemIndex];
      const updatedItem = { ...updatableItem, ...action.payload };
      const updatedPlaces = [...state];
      updatedPlaces[updatableItemIndex] = updatedItem;
      return updatedPlaces;
    default:
      return state;
  }
};
