import axios from "axios";
import { GOOGLE_MAP_API_KEY } from "../constants/secret";
import { Location } from "../types/location";

export const getMapPreview = (lat: number, lgt: number) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lgt}&zoom=14&size=400x200&key=${GOOGLE_MAP_API_KEY}`;
  return mapPreviewUrl;
};

export const getAddress = async (location: Location) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.position.latitude},${location.position.longitude}&key=${GOOGLE_MAP_API_KEY}`;
  const response = await axios.get(url);
  //console.log("getAddess res", response);
  if (response.status !== 200) {
    throw new Error("Failed to fetch readable address");
  }
  const address = response.data.results[0].formatted_address;
  //console.log("formatted address", address);
  return address;
};
