import { LightningElement, api, wire } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";

export default class PortfolioWorkExperience extends LightningElement {
  @api recordId;
  workExperienceList = [];

  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: "WorkExperience__r",
    fields: [
      "WorkExperience__c.JobStartDate__c",
      "WorkExperience__c.JobEndDate__c",
      "WorkExperience__c.Role__c",
      "WorkExperience__c.CompanyName__c",
      "WorkExperience__c.WorkLocation__c",
      "WorkExperience__c.Description__c",
      "WorkExperience__c.IsCurrent__c"
    ]
  })
  workExperienceHandler({ data, error }) {
    if (data) {
      this.formatExperience(data);
    } else if (error) {
      console.error(error);
    }
  }

  formatExperience(data) {
    this.workExperienceList = [...data.records].reverse().map((item) => {
      let id = item.Id;
      const { JobStartDate__c, JobEndDate__c, Role__c, CompanyName__c, WorkLocation__c, Description__c, IsCurrent__c } = item.fields;
      let jobStartDate = this.getValue(JobStartDate__c);
      let jobEndDate = this.getValue(JobEndDate__c);
      let role = this.getValue(Role__c);
      let companyName = this.getValue(CompanyName__c);
      let workLocation = this.getValue(WorkLocation__c);
      let description = this.getValue(Description__c);
      let isCurrent = this.getValue(IsCurrent__c);

      return { id, jobStartDate, jobEndDate, role, companyName, workLocation, description, isCurrent };
    });
  }

  getValue(data) {
    return data && (data.displayValue || data.value);
  }
}
