import { LightningElement, wire, api } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import FULLNAME from "@salesforce/schema/Portfolio__c.FullName__c";
import COMPANY_LOCATION from "@salesforce/schema/Portfolio__c.CompanyLocation__c";
import COMPANY_NAME from "@salesforce/schema/Portfolio__c.CompanyName__c";
import DESIGNATION from "@salesforce/schema/Portfolio__c.Designation__c";

import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";

export default class PortfolioBanner extends LightningElement {
  @api recordId; //= "a0SJ3000000sqQmMAI";
  @api linkedinUrl; //= "https://www.linkedin.com";
  @api youtubeUrl; //= "https://www.youtube.com";
  @api githubUrl; //= "https://www.github.com";
  @api twitterUrl; //= "https://www.twitter.com";
  @api trailheadUrl; //= "https://www.trailhead.com";
  @api bloggerUrl; //= "https://www.blogger.com";

  userPic = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
  linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
  youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`;
  github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
  twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;
  trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;
  blogger = `${PortfolioAssets}/PortfolioAssets/Social/blogger.svg`;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [FULLNAME, COMPANY_LOCATION, COMPANY_NAME, DESIGNATION]
  })
  portfolioData;

  get fullName() {
    return getFieldValue(this.portfolioData.data, FULLNAME);
  }

  get companyLocation() {
    return getFieldValue(this.portfolioData.data, COMPANY_LOCATION);
  }

  get companyName() {
    return getFieldValue(this.portfolioData.data, COMPANY_NAME);
  }

  get designation() {
    return getFieldValue(this.portfolioData.data, DESIGNATION);
  }
}
