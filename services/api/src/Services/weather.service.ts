import { GetForecastPais } from "../Repositories/weather.ipmx";
import { type DailyForecast } from "@workspace/dtotypes/src/Interfaces/weather";

export const weatherService = {
  async getAll(): Promise<DailyForecast[]> {
    return await GetForecastPais();
  }
};
