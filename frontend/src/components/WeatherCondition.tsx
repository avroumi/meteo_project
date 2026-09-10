import { getWeatherInfo } from "../utils/weather";
import { useLanguage } from "../hook/useLanguage";
import { translations } from "../translations/translations";

interface WeatherConditionProps {
  code: number;
}

const WeatherCondition = ({ code }: WeatherConditionProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  const weather = getWeatherInfo(code);
  const Icon = weather.Icon;

  const labels = {
    clearSky: t.clearSky,
    partlyCloudy: t.partlyCloudy,
    cloudy: t.cloudy,
    fog: t.fog,
    rain: t.rain,
    snow: t.snow,
    thunderstorm: t.thunderstorm,
    unknown: t.unknown,
  };

  return (
    <div className={`weather-condition ${weather.className}`}>
      <Icon size={42} />
      <p>{labels[weather.label]}</p>
    </div>
  );
};

export default WeatherCondition;
