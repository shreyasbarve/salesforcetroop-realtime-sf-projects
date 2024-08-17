import { LightningElement } from "lwc";
import { countryCodeList } from "c/countryCodeList";
import currencyConverterAssets from "@salesforce/resourceUrl/currencyConverterAssets";

export default class CurrencyConverter extends LightningElement {
  currencyImage =
    currencyConverterAssets + "/currencyConverterAssets/currency.svg";
  countryList = countryCodeList;
  countryFrom = "USD";
  countryTo = "AUD";
  AUTH_KEY = "123*#";

  amount = "";
  result;
  error;

  handleChange(event) {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    this[name] = value;
    this.result = "";
    this.error = "";
  }

  submitHandler(event) {
    event.preventDefault();
    this.convert();
  }

  async convert() {
    const API_URL = `https://api.exchangerate.host/convert?access_key=${this.AUTH_KEY}&from=${this.countryFrom}&to=${this.countryTo}`;

    try {
      const data = await fetch(API_URL);
      const jsonData = await data.json();
      this.result = Number(this.amount) * jsonData.result.toFixed(2);
      console.log("result", this.result);
    } catch (error) {
      console.error("error:", error);
      this.error = "An error occurred. Please try again...";
    }
  }
}
