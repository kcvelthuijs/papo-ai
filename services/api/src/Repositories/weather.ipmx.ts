import path from "path";
import type { DailyForecast } from "../Services/weather.service";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

type ipmaCities = {
  owner: string;
  country: string;
  data: {
    globalIdLocal: number;
    local: string;
    distrito: string;
    área: string;
    região: string;
    zona: string;
    weatherZone: string;
    elevation: number;
    latitude: string;
    longitude: string;
  }[];
};

type ipmaForecast = {
  owner: string;
  country: string;
  data: Forecast[];
};

type ipmaDailyForecast = {
  owner: string;
  country: string;
  forecastDate: string;
  data: {
    dataUpdate: string;
    globalIdLocal: number;
    idWeatherType: number;
    tMin: number;
    tMax: number;
    classWindSpeed: number;
    predWindDir: string;
    precipitaProb: number;
    classPrecInt: number;
    latitude: number;
    longitude: number;
  }[];
};

type ipmaWeather = {
  owner: string;
  country: string;
  data: {
    idWidWeatherType: number;
    descrição: string;
  }[];
};

type ipmaWind = {
  owner: string;
  country: string;
  data: {
    classWindSpeed: number;
    descrição: string;
  }[];
};

type City = {
  idCity: number;
  cityName: string;
  área: string;
  região: string;
  zona: string;
  weatherZone: string;
  elevation: number;
  latitude: number;
  longitude: number;
};

type Forecast = {
  globalIdLocal: number;
  forecastDate: string;
  tMin: string;
  tMax: string;
  precipitaProb: string;
  idWeatherType: number;
  classWindSpeed: number;
  predWindDir: string;
};

type WeatherType = {
  idWeatherType: number;
  descrição: string;
};

type WindType = {
  classWindSpeed: number;
  descrição: string;
};

type StaticData = {
  cityMap: Record<number, City>;
  windMap: Record<number, WindType>;
  weatherMap: Record<number, WeatherType>;
};

// Cached data with static weather info
let staticCache: StaticData | null = null;

// Functie om steden op te halen
async function fetchCities(): Promise<Record<number, City>> {
  const citiesFilePath = path.join(
    __dirname,
    "..",
    "data",
    "weather",
    "cities.json"
  );
  if (!existsSync(citiesFilePath)) {
    console.log("fetchCities", `File ${citiesFilePath} not found!`);
    return {};
  }

  const fileContent = await readFile(citiesFilePath, "utf8");
  const feed = JSON.parse(fileContent);
  const cities = feed.data.map((item: any) => ({
    idCity: item.globalIdLocal,
    cityName: item.local,
    área: item.área,
    zona: item.zona,
    weatherZone: item.weatherZone,
    elevation: item.elevation,
    latitude: +item.latitude,
    longitude: +item.longitude
  }));
  return Object.fromEntries(cities.map((c: any) => [c.idCity, c]));
}

// Functie om weertypes op te halen
async function fetchWeatherTypes(): Promise<Record<number, WeatherType>> {
  const weatherTypeFilePath = path.join(
    __dirname,
    "..",
    "data",
    "weather",
    "weathertype.json"
  );
  if (!existsSync(weatherTypeFilePath)) {
    console.log("fetchWeatherTypes", `File ${weatherTypeFilePath} not found!`);
    return [];
  }

  const fileContent = await readFile(weatherTypeFilePath, "utf8");
  const feed = JSON.parse(fileContent);
  const wtype = feed.data.map((item: any) => ({
    idWeatherType: +item.idWeatherType,
    descrição: item.descrição
  }));
  return Object.fromEntries(wtype.map((w: any) => [w.idWeatherType, w]));
}

// Functie om windtypes op te halen
async function fetchWindTypes(): Promise<Record<number, WindType>> {
  const windSpeedFilePath = path.join(
    __dirname,
    "..",
    "data",
    "weather",
    "windspeed.json"
  );
  if (!existsSync(windSpeedFilePath)) {
    console.log("fetchWindTypes", `File ${windSpeedFilePath} not found!`);
    return [];
  }

  const fileContent = await readFile(windSpeedFilePath, "utf8");
  const feed = JSON.parse(fileContent);
  const wtype = feed.data.map((item: any) => ({
    classWindSpeed: +item.classWindSpeed,
    descrição: item.descrição
  }));
  return Object.fromEntries(wtype.map((w: any) => [w.classWindSpeed, w]));
}

async function getStaticData(): Promise<StaticData> {
  if (staticCache) return staticCache;

  // create cache
  const cityMap = await fetchCities();
  const weatherMap = await fetchWeatherTypes();
  const windMap = await fetchWindTypes();
  staticCache = { cityMap, weatherMap, windMap };

  return staticCache;
}

async function getDailyForecast(day: number): Promise<DailyForecast[]> {
  await getStaticData();
  const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day${day}.json`;
  const feed = (await fetch(url).then((r) => r.json())) as ipmaDailyForecast;
  const forecast = feed.data.map((d: any) => {
    const city = staticCache?.cityMap[d.globalIdLocal];
    const weather = staticCache?.weatherMap[d.idWeatherType];
    const wind = staticCache?.windMap[d.classWindSpeed];
    return {
      forecastDate: feed.forecastDate,
      cityId: d.globalIdLocal,
      cityName: city?.cityName ?? "",
      área: city?.área ?? "",
      zona: city?.zona ?? "",
      região: city?.região ?? "",
      weatherZone: city?.weatherZone ?? "",
      elevation: city?.elevation ?? 0,
      longitude: city?.longitude ?? 0,
      latitude: city?.latitude ?? 0,
      idWeatherType: d.idWeatherType,
      weatherType: weather?.descrição ?? "",
      classWindSpeed: d.classWindSpeed,
      windspeed: wind?.descrição ?? "",
      predWindDir: d.predWindDir,
      precipitaProb: d.precipitaProb,
      tMin: +d.tMin,
      tMax: +d.tMax
    };
  });
  return forecast;
}

async function getDayByDayForecast(): Promise<DailyForecast[]> {
  const dagen = [0, 1, 2];
  const forecast = await Promise.all(dagen.map((d) => getDailyForecast(d)));
  return forecast.flat();
}

async function get5dayForecast(cityId: number): Promise<Forecast[]> {
  const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${cityId}.json`;
  const feed = (await fetch(url).then((r) => r.json())) as ipmaForecast;
  return feed.data as Forecast[];
}

export async function GetForecastPais() {
  const forecast = await getDayByDayForecast();
  return forecast;
}

/*export async function GetForecastByCityID(cityId: number) {
   await getStaticData();
   const dayByDayWeather = await getDayByDayForecast();
   console.log(
      'getDayByDayForecast',
      dayByDayWeather.filter((d) => d.cityId === cityId)
   );

   const multidayForecast = await get5dayForecast(cityId);
   return multidayForecast.map((day) => {
      const city = staticCache?.cityMap[cityId];
      const weather = staticCache?.weatherMap[day.idWeatherType];
      const wind = staticCache?.windMap[day.classWindSpeed];

      return {
         city: city?.cityName ?? 'unknown',
         date: day.forecastDate,
         min: day.tMin,
         max: day.tMax,
         rain: day.precipitaProb,
         weather: weather?.descrição ?? '',
         wind: wind?.descrição ?? '',
         windDir: day.predWindDir,
      };
   });
}*/
