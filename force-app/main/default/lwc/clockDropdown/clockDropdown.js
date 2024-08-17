import { LightningElement, api } from "lwc";

export default class ClockDropdown extends LightningElement {
  @api label = "";
  @api options = [];
  @api uniqueId = "";

  changeHandler(e) {
    console.log(this.label);
    console.log(e.target.value);
    this.callParent(e.target.value);
  }

  callParent(value) {
    this.dispatchEvent(
      new CustomEvent("optionhandler", {
        detail: {
          label: this.label,
          value: value
        }
      })
    );
  }

  @api
  reset(value) {
    this.template.querySelector("select").value = value;
    this.callParent(value);
  }
}
