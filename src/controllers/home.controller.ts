import WeatherService from "../services/weather.service"
import { Request, Response } from "express"

export class HomeController {
  static async showHome(req: Request, res: Response) {
    try {
      const dataWeather = await WeatherService.getWeatherByName("Tokyo");
      const temp = Math.round(dataWeather.main.temp - 273);
      const weather = dataWeather.weather[0].main;
      const cityName = dataWeather.name;
      res.render("home", { temp, weather, cityName });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch weather data.", error });
    }
  }

  static async submitCity(req: Request, res: Response) {
    try {
      const { cityName } = req.body;
      const dataWeather = await WeatherService.getWeatherByName(cityName);
      const temp = Math.round(dataWeather.main.temp- 273);
      const weather = dataWeather.weather[0].main;
      const city = dataWeather.name;
      res.render("home", { temp, weather, cityName: city });
    } catch (error) {
      res.status(500).render("home", { temp: null, weather: null, cityName: "Error", error });
    }
  }
}