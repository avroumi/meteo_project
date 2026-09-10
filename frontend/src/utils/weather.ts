import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudLightning,
  Snowflake,
} from "lucide-react";

export const getWeatherInfo = (code: number) => {
  if (code === 0) {
    return {
      label: "clearSky" as const,
      Icon: Sun,
      className: "sunny",
    };
  }

  if ([1, 2].includes(code)) {
    return {
      label: "partlyCloudy" as const,
      Icon: CloudSun,
      className: "cloudy",
    };
  }

  if (code === 3) {
    return {
      label: "cloudy" as const,
      Icon: Cloud,
      className: "cloudy",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "fog" as const,
      Icon: CloudFog,
      className: "fog",
    };
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: "rain" as const,
      Icon: CloudRain,
      className: "rain",
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "snow" as const,
      Icon: Snowflake,
      className: "snow",
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: "thunderstorm" as const,
      Icon: CloudLightning,
      className: "storm",
    };
  }

  return {
    label: "unknown" as const,
    Icon: Cloud,
    className: "cloudy",
  };
};
