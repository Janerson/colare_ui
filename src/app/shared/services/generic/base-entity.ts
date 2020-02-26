export class BaseEntity {
    id?:number;
    seqID?:number;

    constructor(obj:BaseEntity){
        Object.assign(this,obj)
        delete this.seqID;
    }
}

