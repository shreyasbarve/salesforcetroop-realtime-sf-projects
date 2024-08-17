import { LightningElement, api } from "lwc";

export default class PortfolioUserDetails extends LightningElement {
  @api recordId;
  @api objectApiName;
  @api resumeUrl;

  downloadResume() {
    // "https://creative-otter-p6qqwp-dev-ed.trailblaze.file.force.com/sfc/servlet.shepherd/document/download/069J3000001lGm9IAE?operationContext=S1"
    window.open(this.resumeUrl, "__blank");
  }
}
