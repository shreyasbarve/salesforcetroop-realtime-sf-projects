import { LightningElement, wire } from "lwc";
import LightningConfirm from "lightning/confirm";
import { refreshApex } from "@salesforce/apex";

import createNoteRecord from "@salesforce/apex/NoteTakingController.createNoteRecord";
import updateNoteRecord from "@salesforce/apex/NoteTakingController.updateNoteRecord";
import deleteNoteRecord from "@salesforce/apex/NoteTakingController.deleteNoteRecord";
import getNotes from "@salesforce/apex/NoteTakingController.getNotes";

const DEFAULT_NOTE_FORM = {
  Name: "",
  Note_Description__c: ""
};

export default class NoteTakingApp extends LightningElement {
  showModal = false;
  noteRecord = DEFAULT_NOTE_FORM;
  noteList = [];
  selectedRecordId = "";
  wireNoteResult;
  formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "clean",
    "table",
    "header",
    "color"
  ];

  get isFormInvalid() {
    return !(
      this.noteRecord &&
      this.noteRecord.Note_Description__c &&
      this.noteRecord.Name
    );
  }

  get modalName() {
    return this.selectedRecordId ? "Update Note" : "Add Note";
  }

  @wire(getNotes)
  noteListInfo(result) {
    this.wireNoteResult = result;
    const { data, error } = result;

    if (data) {
      console.log("data: ", JSON.stringify(data));
      this.noteList = data.map((item) => {
        let formattedDate = new Date(item.LastModifiedDate).toDateString();
        return { ...item, formattedDate };
      });
    }
    if (error) {
      this.showToastMsg(error.message.body, "error");
    }
  }

  createNoteHandler() {
    this.showModal = true;
  }

  closeModalHandler() {
    this.showModal = false;
    this.noteRecord = DEFAULT_NOTE_FORM;
    this.selectedRecordId = null;
  }

  changeHandler(event) {
    const { name, value } = event.target;

    this.noteRecord = { ...this.noteRecord, [name]: value };
  }

  formSubmitHandler(event) {
    event.preventDefault();
    console.log("this.noteRecord", JSON.stringify(this.noteRecord));
    if (this.selectedRecordId) {
      this.updateNote(this.selectedRecordId);
    } else {
      this.createNote();
    }
  }

  createNote() {
    createNoteRecord({
      title: this.noteRecord.Name,
      description: this.noteRecord.Note_Description__c
    })
      .then(() => {
        this.showModal = false;
        this.noteRecord = DEFAULT_NOTE_FORM;
        this.showToastMsg("Note created successfully!!", "success");
        this.refresh();
      })
      .catch((error) => {
        this.showToastMsg(error.message.body, "error");
      });
  }

  updateNote(noteId) {
    const { Name, Note_Description__c } = this.noteRecord;
    updateNoteRecord({ noteId, title: Name, description: Note_Description__c })
      .then(() => {
        this.showModal = false;
        this.selectedRecordId = null;
        this.showToastMsg("Note updated successfully!!", "success");
        this.refresh();
      })
      .catch((error) => {
        this.showToastMsg(error.message.body, "error");
      });
  }

  showToastMsg(message, variant) {
    const elem = this.template.querySelector("c-notification");
    if (elem) {
      elem.showToast(message, variant);
    }
  }

  editNoteHandler(event) {
    const { recordid } = event.target.dataset;
    const noteRecord = this.noteList.find((item) => item.Id === recordid);
    this.noteRecord = {
      Name: noteRecord.Name,
      Note_Description__c: noteRecord.Note_Description__c
    };
    this.selectedRecordId = recordid;
    this.showModal = true;
  }

  deleteNoteHandler(event) {
    this.selectedRecordId = event.dataset.recordid;
    this.handlerConfirm();
  }

  async handlerConfirm() {
    const result = await LightningConfirm.open({
      message: "Are you sure you want to delete this note?",
      variant: "headerless",
      label: "Delete Confirmation"
    });
    if (result) {
      this.deleteHandler();
    } else {
      this.selectedRecordId = null;
    }
  }

  deleteHandler() {
    deleteNoteRecord({ noteId: this.selectedRecordId })
      .then(() => {
        this.showModal = false;
        this.selectedRecordId = null;
        this.showToastMsg("Note deleted successfully!!", "success");
        this.refresh();
      })
      .catch((error) => {
        this.showToastMsg(error.message.body, "error");
      });
  }

  refresh() {
    return refreshApex(this.wireNoteResult);
  }
}
