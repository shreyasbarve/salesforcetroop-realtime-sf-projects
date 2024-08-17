import { LightningElement } from "lwc";
import AlarmClockAssets from "@salesforce/resourceUrl/AlarmClockAssets";

export default class AlarmClockApp extends LightningElement {
  clockImage = AlarmClockAssets + "/AlarmClockAssets/clock.png";
  ringtone = new Audio(AlarmClockAssets + "/AlarmClockAssets/Clocksound.mp3");
  currentTime = "";
  hours = [];
  minutes = [];
  meridiems = ["AM", "PM"];

  hourSelected;
  minuteSelected;
  meridiemSelected;

  alarmTime;
  isAlarmSet = false;
  isAlarmTriggered = false;

  get isFieldNotSelected() {
    return !(this.hourSelected && this.minuteSelected && this.meridiemSelected);
  }

  get shakeImage() {
    return this.isAlarmTriggered ? "shake" : "";
  }

  //   called when the component renders and data loads
  connectedCallback() {
    this.createHoursOptions();
    this.createMinutesOptions();
    this.currentTimeHandler();
  }

  currentTimeHandler() {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setInterval(() => {
      let dateTime = new Date();
      let hour = dateTime.getHours();
      let min = dateTime.getMinutes();
      let sec = dateTime.getSeconds();
      let ampm = "AM";

      if (hour === 0) {
        hour = 12;
        ampm = "AM";
      } else if (hour === 12) {
        ampm = "PM";
      } else if (hour >= 12) {
        hour = hour - 12;
        ampm = "PM";
      }

      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;

      this.currentTime = `${hour}:${min}:${sec} ${ampm}`;

      if (this.alarmTime === `${hour}:${min} ${ampm}`) {
        console.log("Alarm Triggered");
        this.isAlarmTriggered = true;
        this.ringtone.play();
        this.ringtone.loop = true;
      }
    }, 1000);
  }

  createHoursOptions() {
    for (let i = 0; i <= 12; i++) {
      let val = i < 10 ? "0" + i : i;
      this.hours.push(val);
    }
  }

  createMinutesOptions() {
    for (let i = 0; i <= 59; i++) {
      let val = i < 10 ? "0" + i : i;
      this.minutes.push(val);
    }
  }

  optionHandler(e) {
    const { label, value } = e.detail;
    if (label === "Hour(s)") {
      this.hourSelected = value;
    } else if (label === "Minute(s)") {
      this.minuteSelected = value;
    } else if (label === "AM / PM") {
      this.meridiemSelected = value;
    }

    // console.log("this.hourSelected", this.hourSelected);
    // console.log("this.minuteSelected", this.minuteSelected);
    // console.log("this.meridiemSelected", this.meridiemSelected);
  }

  setAlarmHandler() {
    this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meridiemSelected}`;
    this.isAlarmSet = true;
  }

  clearAlarmHandler() {
    this.isAlarmSet = false;
    this.alarmTime = "";
    this.isAlarmTriggered = false;
    this.ringtone.pause();
    const elements = this.template.querySelectorAll("c-clock-dropdown");
    Array.from(elements).forEach((element) => {
      element.reset("");
    });
  }
}
