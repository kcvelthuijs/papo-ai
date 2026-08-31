import axios from 'axios';
import { type DailyForecast } from '@workspace/dtotypes';

const getWeatherData = async (): Promise<DailyForecast[]> => {
  try {
    const { data } = await axios.get<DailyForecast[]>('/api/forecast');
    return data;
  } catch (error) {
    return [];
  }
};
const allWeatherData: DailyForecast[] = await getWeatherData();

export const getRegionalWeather = async (
  region: string,
): Promise<DailyForecast[]> => {
  return allWeatherData.filter(
    (w) =>
      w.weatherZone.toLowerCase() == region.toLowerCase() ||
      w.região.toLowerCase() === region.toLowerCase() ||
      w.zona.toLowerCase() === region.toLowerCase(),
  );
};
