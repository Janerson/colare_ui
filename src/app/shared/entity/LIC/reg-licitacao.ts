import { BaseEntity } from '../api/base-entity';

/**
 * Informações sobre a regulamentação municipal do pregão, registro de preços e LC 123/06
 */
export class RegLicitacao extends BaseEntity<String> {
  /**
   * Código do Tipo de Envio
   */
   codTipoEnvio: number;
  /**
   * Tipo de regulamentação
   */
   codTipoRegulamentacao: number;
  /**
   * Data do Decreto Municipal
   */
  dataDecretoMunicipal?: Date;
  /**
   * Data da Publicação
   */
  dataPublicacao?: Date;

  detalhamentoLc123?: DetalhamentoLc123;
  /**
   * Informa a existência ou não de regulamentação municipal
   */
  existeRegulamentacaoMunicipal: boolean;
  /**
   * ID do arquivo enviado contendo o documento digitalizado
   */
  idDocumentoPDF?: string;
  /**
   * Descreve o motivo da Atualização ou Correção
   */
  motivoAtualizacaoCorrecao?: string;
  /**
   * Número do Decreto Municipal Regulamentador do Pregão, Registro de Preços ou da LC 123-06
   */
  numeroDecretoMunicipal?: string;   
}

/**
 * Detalhamento da regulamentação do Artigo 47 da Lei Complementar 123/06
 */
export class DetalhamentoLc123 extends BaseEntity<String> {
  /**
   * Artigo relativo aos critérios para empenho e pagamento a ME e EPP
   */
  artigoEmpenhoPagamentoMEEPP?: string;
  /**
   * Artigo do percentual do objeto para contratação de ME e EPP
   */
  artigoPercObjetoContratacaoMEEPP?: string;
  /**
   * Artigo dos procedimentos de subcontratação de ME e EPP
   */
  artigoProcSubContratacaoMEEPP?: string;
  /**
   * Artigo que regulamenta a participação exclusiva de ME e EPP
   */
  artigoRegulamentouParticipExclusivaMEEPP?: string;
  /**
   * Percentual do objeto estabelecido para contratação de ME e EPP
   */
  percentualObjetoContratacaoMEEPP?: number;
  /**
   * Percentual estabelecido para subcontratação de ME e EPP
   */
  percentualSubContratacaoMEEPP?: number;
  /**
   * Identifica se o município estabeleceu critérios para empenho e pagamento a ME e EPP
   */
  regulamentouCriteriosEmpenhoPagamentoMEEPP: boolean;
  /**
   * Identifica se o município regulamentou procedimentos para participação exclusiva de ME e
   * EPP
   */
  regulamentouParticipExclusivaMEEPP: boolean;
  /**
   * Identifica se o município estabeleceu reserva de percentual do objeto para a contratação
   * de ME e EPP
   */
  regulamentouPercObjetoContratacaoMEEPP: boolean;
  /**
   * Identifica se o município estabeleceu procedimentos para a subcontratação de ME e EPP
   */
  regulamentouProcSubContratacaoMEEPP: boolean;
  /**
   * Valor Limite da regulamentação da participação exclusiva de ME e EPP.
   */
  valorLimiteRegParticipExclusivaMEEPP?: number;
}
