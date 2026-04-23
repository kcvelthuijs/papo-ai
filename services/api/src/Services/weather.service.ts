import { type DailyForecast } from '@workspace/dtotypes';
import { GetForecastPais } from '@repositories/ipma';

export const weatherService = {
  async getAll(): Promise<DailyForecast[]> {
    return await GetForecastPais();
  },
};
