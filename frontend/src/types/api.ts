export interface City {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
}

export interface ForecastDay {
  date: string;
  weatherCode: number;
  minTemperature: number;
  maxTemperature: number;
  precipitation: number;
  precipitationProbability: number;
}

export interface ForecastResponse {
  days: ForecastDay[];
}

export interface CompareCity {
  city: string;
  weather: CurrentWeather;
}

export interface CompareResponse {
  compare1: CompareCity;
  compare2: CompareCity;
}

export interface Favorite {
  id: string;
  explorerName: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface FavoriteCreate {
  explorerName: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface AtbashResponse {
  original: string;
  transformed: string;
}

export interface AtbashRequest {
  text: string;
  language: "he" | "en";
}
