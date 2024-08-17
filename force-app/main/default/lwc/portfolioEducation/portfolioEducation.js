import { LightningElement, api, wire } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";

const COLUMNS = [
  { label: "Education", fieldName: "education" },
  { label: "Institution Name", fieldName: "institutionName" },
  { label: "Passing Year", fieldName: "passingYear" }
];

export default class PortfolioEducation extends LightningElement {
  @api recordId;
  tableData = [];
  columns = COLUMNS;

  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: "Educations__r",
    fields: ["Education__c.InstitutionName__c", "Education__c.Title__c", "Education__c.PassingYear__c"],
    sortBy: ["Education__c.PassingYear__c"]
  })
  educationHandler({ data, error }) {
    if (data) {
      this.formatData(data);
    } else if (error) {
      console.error(error);
    }
  }

  formatData(data) {
    this.tableData = [...data.records].reverse().map((item) => {
      let Id = item.id;
      const { InstitutionName__c, Title__c, PassingYear__c } = item.fields;

      let education = Title__c.value;
      let institutionName = InstitutionName__c.value;
      let passingYear = PassingYear__c.value;

      return { Id, education, institutionName, passingYear };
    });
  }
}
