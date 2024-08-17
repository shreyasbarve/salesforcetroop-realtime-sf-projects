import { LightningElement, api, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import TECH_SKILLS_FIELD from "@salesforce/schema/Portfolio__c.TechnicalSkills__c";
import SOFT_SKILLS_FIELD from "@salesforce/schema/Portfolio__c.SoftSkills__c";
import SOFTWARE_FIELD from "@salesforce/schema/Portfolio__c.SoftwareTools__c";
import METHODOLOGIES_FIELD from "@salesforce/schema/Portfolio__c.SoftwareDevelopmentMethodologies__c";

export default class PortfolioSkills extends LightningElement {
  @api recordId;
  techSkills = [];
  softSkills = [];
  software = [];
  methodologies = [];

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [TECH_SKILLS_FIELD, SOFT_SKILLS_FIELD, SOFTWARE_FIELD, METHODOLOGIES_FIELD]
  })
  skillHandler({ data, error }) {
    if (data) {
      this.formatSkills(data);
    } else if (error) {
      console.error(error);
    }
  }

  formatSkills(data) {
    const { TechnicalSkills__c, SoftSkills__c, SoftwareTools__c, SoftwareDevelopmentMethodologies__c } = data.fields;
    this.techSkills = TechnicalSkills__c ? TechnicalSkills__c.value.split(",") : [];
    this.softSkills = SoftSkills__c ? SoftSkills__c.value.split(",") : [];
    this.software = SoftwareTools__c ? SoftwareTools__c.value.split(",") : [];
    this.methodologies = SoftwareDevelopmentMethodologies__c ? SoftwareDevelopmentMethodologies__c.value.split(",") : [];
  }
}
