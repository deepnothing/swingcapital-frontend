import { feature } from "topojson-client";
import countries from "./smoothCountries.json";

export const COUNTRIES = feature(countries, countries.objects.countries).features;