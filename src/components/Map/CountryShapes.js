import { feature } from "topojson-client";
import countries from "./data.json";
export const COUNTRIES = feature(countries, countries.objects.countries).features;