export class BaseEntity {
  id?: number;
  seqID?: number;

  constructor(obj: BaseEntity) {
    Object.assign(this, obj);
    delete this.seqID;
   this.removeEmpty(this)
  }

  private removeEmpty = obj => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === "object") this.removeEmpty(obj[key]);
      // recurse
      else if (obj[key] == null) delete obj[key]; // delete
    });
  };

  private clearEmpties(o) {
    for (var k in o) {
      if (!o[k] || typeof o[k] !== "object") {
        continue // If null or not an object, skip to the next iteration
      }
  
      // The property is an object
     this.clearEmpties(o[k]); // <-- Make a recursive call on the nested object
      if (Object.keys(o[k]).length === 0) {
        delete o[k]; // The object had no properties, so delete that property
      }
    }
  }
}
