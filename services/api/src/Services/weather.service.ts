import { type DailyForecast } from '@workspace/dtotypes/src/Interfaces/weather';
import { GetForecastPais } from '@repositories/ipma/src/Weather/weather.repository';

export const weatherService = {
  async getAll(): Promise<DailyForecast[]> {
    return await GetForecastPais();
  },
};
