import { BaseEntity } from '../api/base-entity';

/**
 * Dados do contrato
 */
export interface ContratoInicial extends BaseEntity<String> {
    /**
     * Ano do contrato
     */
    anoContrato: number;
    /**
     * Código da Natureza do Objeto
     */
    codNaturezaObjeto: number;
    /**
     * Código do Tipo de Envio
     */
    codTipoEnvio: number;
    /**
     * Tipo de formalização do contrato
     */
    codTipoFormalizacaoContrato: number;
    /**
     * Tipo do procedimento
     */
    codTipoProcedimento: number;
    /**
     * Unidade de medida do prazo para entrega do objeto ou execução do contrato
     */
    codUnidadeMedidaPrazoExecucao: number;
    contratado:                    Contratado;
    /**
     * Data da firmatura do documento
     */
    dataFirmatura?: Date;
    empenho?:       Empenho[];
    /**
     * Data do fim da vigência
     */
    fimVigencia?: Date;
    /**
     * Descrição da forma de pagamento
     */
    formaPagamento: string;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
    /**
     * ID do procedimento do qual decorre o contrato
     */
    idProcedimento: number;
    /**
     * Data do início da vigência
     */
    inicioVigencia?: Date;
    /**
     * Descreve o motivo da Atualização ou Correção
     */
    motivoAtualizacaoCorrecao?: string;
    naturezaDoObjetoDetalhada:  NaturezaDoObjetoDetalhada[];
    /**
     * Número do contrato
     */
    numeroContrato?: string;
    /**
     * Objeto
     */
    objeto: string;
    /**
     * Prazo para entrega do objeto ou execução do contrato
     */
    prazoExecucao:              number;
    procedimentoDeContratacao?: ProcedimentoDeContratacao;
    publicacao:                 Publicacao[];
    responsaveis:               Responsaveis[];
}

/**
 * Dados do contratado
 */
export interface Contratado {
    /**
     * Código IBGE do Estado onde foi realizada a inscrição
     */
    codIbgeInscricaoEstadual?: string;
    /**
     * Código IBGE da unidade onde foi realizada a inscrição
     */
    codIbgeUFInscricaoCREA_CAU?: string;
    /**
     * Identifica o tipo do documento
     */
    codTipoDocumento: number;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF?: string;
    /**
     * Número da Certidão de Regularidade do FGTS
     */
    numeroCertidaoRegularidadeFGTS?: string;
    /**
     * Número da Certidão de Regularidade do INSS
     */
    numeroCertidaoRegularidadeINSS?: string;
    /**
     * Número da Certidão negativa de Débitos Trabalhistas
     */
    numeroCNDT?: string;
    /**
     * Número do documento
     */
    numeroDocumento: string;
    /**
     * Número de inscrição no CREA/CAU
     */
    numeroInscricaoCREA_CAU?: string;
    /**
     * Número de Inscrição Estadual
     */
    numeroInscricaoEstadual?: string;
    precoContratado:          PrecoContratado[];
    quadroSocietario?:        QuadroSocietario[];
}

/**
 * Preço contratado por item
 */
export interface PrecoContratado {
    /**
     * Número do Item
     */
    numeroItem: number;
    /**
     * Número do Lote
     */
    numeroLote: number;
    /**
     * Quantidade
     */
    quantidade: number;
    /**
     * Valor Unitário
     */
    valorUnitario: number;
}

/**
 * Quadro societário do contratado
 */
export interface QuadroSocietario {
    /**
     * Identifica o tipo do documento
     */
    codTipoDocumento: number;
    /**
     * Código do tipo de Participação do Sócio
     */
    codTipoParticipacao: number;
    /**
     * Número do documento
     */
    numeroDocumento: string;
}

/**
 * Dados do empenho decorrente do contrato
 */
export interface Empenho {
    /**
     * Data de emissão do empenho
     */
    dataEmpenho: Date;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
    /**
     * Número do empenho
     */
    numeroEmpenho: number;
    /**
     * Valor do empenho
     */
    valorEmpenho: number;
}

/**
 * Detalhar a natureza do objeto
 */
export interface NaturezaDoObjetoDetalhada {
    /**
     * Detalhamento da natureza do objeto
     */
    codNaturezaObjetoDetalhada: number;
    /**
     * Descrição da natureza do objeto quando for selecionado a Natureza do objeto = Outros
     */
    descricaoNaturezaObjetoOutros?: string;
}

/**
 * Preencher exclusivamente e obrigatoriamente quando idProcedimento for igual a "-1", com
 * os dados do Procedimento de contratação (Licitação, Dispensa/Inexigibilidade ou Adesão a
 * Registro de Preços).
 */
export interface ProcedimentoDeContratacao {
    adesaoARegistroDePrecos?:  AdesaoARegistroDePrecos;
    dispensaEInexigibilidade?: DispensaEInexigibilidade;
    /**
     * ID da Unidade Gestora conforme cadastro no sistema Passaporte
     */
    idUnidadeGestora: number;
    licitacao?:       Licitacao;
}

/**
 * Preencher exclusivamente e obrigatoriamente quando codTipoProcedimento for igual a
 * "3-Adesão a registro de preços", com os dados da adesão da qual resultou o contrato.
 */
export interface AdesaoARegistroDePrecos {
    /**
     * Código da esfera governamental do órgão gerenciador
     */
    codEsferaOrgaoGerenciador: number;
    /**
     * Código IBGE do ente federativo ao qual pertence o órgão gerenciador
     */
    codIBGEEnteGerenciador: string;
    /**
     * Data da Ata de Registro de Preços
     */
    dataAtaRegistroPreco: Date;
    /**
     * Data de validade
     */
    dataValidade: Date;
    documentos:   Documentos[];
    /**
     * Exercício em que foi iniciado o procedimento de adesão
     */
    exercicioAdesao: number;
    /**
     * Número do documento
     */
    numeroDocumento: string;
}

/**
 * Documentos relacionados à adesão
 */
export interface Documentos {
    /**
     * Tipo do documento anexado relacionado à adesão
     */
    codTipoDocumentoAnexadoAdesao: number;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
}

/**
 * Preencher exclusivamente e obrigatoriamente quando codTipoProcedimento for igual a
 * "2-Dispensa", com os dados da dispensa/inexigibilidade da qual resultou o contrato.
 */
export interface DispensaEInexigibilidade {
    /**
     * Tipo do processo de Dispensa
     */
    codTipoProcesso: number;
    editalEAnexos?:  EditalEAnexos[];
    /**
     * Exercício do Processo de Dispensa
     */
    exercicioProcesso: number;
}

/**
 * Edital do Credenciamento / Chamada Pública - Preenchimento exclusivo e obrigatório se
 * tipoProcesso = 1 ou 3 (Credenciamento ou chamada pública). Arquivos PDF do Edital e seus
 * Anexos.
 */
export interface EditalEAnexos {
    /**
     * Código do tipo de documento enviado - Edital e Anexos, conforme tabela
     */
    codTipoEditalAnexos: number;
    /**
     * Descrição
     */
    descricao: string;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
}

/**
 * Preencher exclusivamente e obrigatoriamente quando codTipoProcedimento for igual a
 * "1-Licitação", com os dados da licitação da qual resultou o contrato.
 */
export interface Licitacao {
    /**
     * Modalidade da Licitação
     */
    codModalidadeLicitacao: number;
    editalEAnexos:          EditalEAnexos[];
    /**
     * Exercício do edital da licitação
     */
    exercicioLicitacao: number;
    /**
     * Número da Licitação por modalidade
     */
    numeroLicitacao: number;
}

/**
 * Publicação do contrato.
 */
export interface Publicacao {
    /**
     * Código do veículo da Publicação
     */
    codVeiculoPublicacao: number;
    /**
     * Data da Publicação
     */
    dataPublicacao: Date;
    /**
     * Descrição
     */
    descricao?: string;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
}

/**
 * Responsáveis pelo contrato
 */
export interface Responsaveis {
    /**
     * Código do tipo de responsabilidade
     */
    codTipoResponsabilidade: number;
    /**
     * Número do CPF
     */
    numeroCpf: string;
}
