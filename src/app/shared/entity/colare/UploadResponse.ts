export interface UploadResponse {
    arquivo:     string;
    signatarios: Signatario[];
}

export interface Signatario {
    nome: string;
    cpf:  string;
    data: number;
}
