export interface MetaData {
    currentPage : number;
    totalPages : number;
    pageSize : number;
    totalCount : number;
}

export class PaginatedResponse<T>{
    item : T;
    metaData : MetaData;
    constructor(item:T,metaData : MetaData){
        this.item = item;
        this.metaData = metaData;
    }
}