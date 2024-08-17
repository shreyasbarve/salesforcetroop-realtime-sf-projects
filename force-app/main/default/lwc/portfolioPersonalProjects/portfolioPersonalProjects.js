import { LightningElement } from "lwc";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";

export default class PortfolioPersonalProjects extends LightningElement {
  bmiCalculator = `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`;
  alarmClock = `${PortfolioAssets}/PortfolioAssets/Projects/AlarmClock.png`;
  currencyCalculator = `${PortfolioAssets}/PortfolioAssets/Projects/CurrencyCalculator.png`;
  weatherApp = `${PortfolioAssets}/PortfolioAssets/Projects/WeatherApp.png`;
  surveyApp = `${PortfolioAssets}/PortfolioAssets/Projects/Survey.png`;
  noteApp = `${PortfolioAssets}/PortfolioAssets/Projects/NoteTakingApp.png`;

  projects = [
    {
      name: "BMI Calculator App",
      img: this.bmiCalculator,
      link: "https://creative-otter-p6qqwp-dev-ed.trailblaze.my.site.com/bmi-calculator"
    },
    {
      name: "Alarm Clock App",
      img: this.alarmClock,
      link: "https://creative-otter-p6qqwp-dev-ed.trailblaze.my.site.com/alarm-clock"
    },
    {
      name: "Currency Calculator App",
      img: this.currencyCalculator,
      link: "https://creative-otter-p6qqwp-dev-ed.trailblaze.my.site.com/currency-calculator"
    },
    {
      name: "Weather App",
      img: this.weatherApp,
      link: "https://creative-otter-p6qqwp-dev-ed.trailblaze.my.site.com/weather-app"
    },
    {
      name: "Survey App",
      img: this.surveyApp,
      link: "https://creative-otter-p6qqwp-dev-ed.trailblaze.my.site.com/survey/survey/runtimeApp.app?invitationId=0KiJ30000008YyI&surveyName=employee_survey&UUID=5e8c3673-4c60-4337-98b6-92a7b55aa383"
    },
    {
      name: "Note Taking App",
      img: this.noteApp,
      link: "https://creative-otter-p6qqwp-dev-ed.trailblaze.my.site.com/note-taking-app"
    }
  ];
}
