import axios from "axios";

export default class WeatherService {
  static async getWeatherByName(cityName: string) {
    const res = await axios.get(process.env.OPEN_WEATHER_URL!, {
      params: {
        q: cityName,
        appid: process.env.OPEN_WEATHER_API_KEY,
      }
    })
    return res.data;
  }
}