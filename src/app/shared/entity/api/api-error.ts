
export interface APIError {
    status:  string;
    statusCode:  number;
    message: string;
    errors:  string[];
}

export interface Erro400{
    error?:string;
    error_description?:string
}