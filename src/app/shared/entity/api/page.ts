export class Page<T> {
    content: T[];
    totalPages:number;
    totalElements:number;
    numberOfElements:number;
    size:number;
    first:boolean;
    last:boolean;
    empty:boolean
}
