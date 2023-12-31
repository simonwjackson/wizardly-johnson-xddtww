import React from "react";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export default class CityWeather extends React.Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    fetch(`/api/weather?q=${city}`)
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }));
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult?.main?.temp)?.toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherResult?.weather[0]?.description}</div>
      </div>
    );
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}

// Forking
