import { BaseEntity } from '../../base-entity';

/**
 * Dados da rescisão contratual.
 */
export interface ContratoRecisao extends BaseEntity<String> {
    /**
     * Motivo da rescisão
     */
    codMotivoRescisao: number;
    /**
     * Código do Tipo de Envio
     */
    codTipoEnvio: number;
    /**
     * Tipo da rescisão
     */
    codTipoRescisao:   number;
    contratoOriginal?: ContratoOriginal;
    /**
     * Data do evento
     */
    data:            Date;
    empenhoAnulado?: EmpenhoAnulado[];
    /**
     * ID do contrato original previamente informado.
     */
    idContratoOriginal: number;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
    /**
     * Descreve o motivo da Atualização ou Correção
     */
    motivoAtualizacaoCorrecao?: string;
    publicacao:                 Publicacao[];
    /**
     * Saldo final executado do contrato
     */
    saldoFinalExecutadoContrato?: number;
}

/**
 * Preencher exclusivamente e obrigatoriamente quando idContratoOriginal for igual a -1, com
 * os dados do contrato original que está sendo rescindido.
 */
export interface ContratoOriginal {
    /**
     * Ano do contrato
     */
    anoContrato: number;
    /**
     * Código da Natureza do Objeto
     */
    codNaturezaObjeto: number;
    /**
     * Tipo do procedimento
     */
    codTipoProcedimento: number;
    /**
     * Data do fim da vigência
     */
    fimVigencia: Date;
    /**
     * ID do arquivo enviado contendo o documento digitalizado
     */
    idDocumentoPDF: string;
    /**
     * Data do início da vigência
     */
    inicioVigencia: Date;
    licitacao?:     Licitacao;
    /**
     * Número do contrato
     */
    numeroContrato: string;
    /**
     * Objeto
     */
    objeto: string;
    /**
     * Valor do contrato
     */
    valorContrato: number;
}

/**
 * Preencher exclusivamente e obrigatoriamente quando codTipoProcedimento for igual a 1 -
 * Licitação, com os dados da licitação da qual resultou o contrato original que está sendo
 * rescindido.
 */
export interface Licitacao {
    /**
     * Modalidade da Licitação
     */
    codModalidadeLicitacao: number;
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
 * Dados dos empenhos anulados em decorrência da rescisão do contrato
 */
export interface EmpenhoAnulado {
    /**
     * Data em que o empenho foi anulado.
     */
    dataAnulacaoEmpenho: Date;
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
     * Valor anulado do empenho
     */
    valorAnulacaoEmpenho: number;
}

/**
 * Publicação da rescisão contratual
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
