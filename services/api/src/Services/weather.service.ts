import { GetForecastPais } from '../Repositories/weather.ipmx';

export type DailyForecast = {
   forecastDate: string;
   cityId: number;
   cityName: string;
   área: string;
   região: string;
   zona: string;
   weatherZone: string;
   elevation: number;
   latitude: number;
   longitude: number;
   idWeatherType: number;
   weatherType: string;
   classWindSpeed: number;
   windspeed: string;
   predWindDir: string;
   precipitaProb: number;
   tMin: number;
   tMax: number;
};

export const weatherService = {
   async getAll(): Promise<DailyForecast[]> {
      return await GetForecastPais();
   },
};
