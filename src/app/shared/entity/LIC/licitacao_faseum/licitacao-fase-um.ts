import { BaseEntity} from "../../base-entity";

/**
 * Envio inicial dos dados da licitação - Abertura da licitação
 */
export interface LicitacaoFaseUm extends BaseEntity<String> {
  /**
   * Modalidade da Licitação
   */
  codModalidadeLicitacao?: number;
  /**
   * Código da Natureza do Objeto
   */
  codNaturezaObjeto?: number;
  /**
   * Natureza do Procedimento
   */
  codNaturezaProcedimento?: number;
  /**
   * Regime de execução
   */
  codRegimeExecucao?: number;
  /**
   * Código do Tipo de Envio
   */
  codTipoEnvio?: number;
  /**
   * Tipo de licitação
   */
  codTipoLicitacaoCriterioJulgamento?: number;
  comissao?: Comissao[];
  /**
   * Licitação com preferência para ME e EPP (Art. 44, Lei Complementar 123/2006)
   */
  criterioDesempateMEEPP?: boolean;
  /**
   * Data prevista para a sessão de recebimento da documentação
   */
  dataPrevistaAberturaSessao?: Date;
  /**
   * Descreve o prêmio ou a remuneração do vencedor do Concurso.
   */
  descricaoPremioOuRemuneracaoConcurso?: string;
  /**
   * Destinação exclusiva a ME e EPP (Art. 48, I, Lei Complementar 123/2006)
   */
  destinacaoExclusivaMEEPP?: boolean;
  editalEAnexos?: EditalEAnexos[];
  /**
   * Exercício do edital da licitação
   */
  exercicioLicitacao?: number;
  /**
   * ID do arquivo enviado contendo o documento digitalizado
   */
  idDocumentoPDF?: string;
  /**
   * ID da Unidade Gestora conforme cadastro no sistema Passaporte
   */
  idUnidadeGestora?: number;
  /**
   * Estabeleceu limite percentual do objeto para a contratação de ME e EPP? (Art. 48, III,
   * Lei Complementar 123/2006)
   */
  limitePercObjetoContratacaoMEEPP?: boolean;

  lote?: Lote[];
  /**
   * Descreve o motivo da Atualização ou Correção
   */
  motivoAtualizacaoCorrecao?: string;
  naturezaDoObjetoDetalhada?: NaturezaDoObjetoDetalhada[];
  /**
   * Número de convidados.
   */
  numeroDeConvidados?: number;
  /**
   * Número da Licitação por modalidade
   */
  numeroLicitacao?: number;
  /**
   * Número do Processo Administrativo
   */
  numeroProcessoAdministrativo?: string;
  /**
   * Objeto
   */
  objeto?: string;
  parecer?: Parecer[];
  /**
   * Processo realizado por lote
   */
  processoPorLote?: boolean;
  publicacao?: Publicacao[];
  recursoOrcamentario?: RecursoOrcamentario[];
  responsaveis?: Responsaveis[];
  /**
   * Trata-se de prestação de serviço a ser executado de forma contínua.
   */
  servicoContinuo?: boolean;
  /**
   * Exigência de subcontratação de ME e EPP (Art. 48, II, Lei Complementar 123/2006)
   */
  subcontratacaoMEEPP?: boolean;
}

/**
 * Detalhamento da composição da comissão de licitação / Pregoeiro - Equipe de Apoio
 */
export interface Comissao extends BaseEntity<String> {
  /**
   * Tipo do ato de nomeação da comissão
   */
  codTipoAtoNomeacao?: number;
  /**
   * Código que identifica o tipo da comissão
   */
  codTipoComissao?: number;
  /**
   * Data do Ato de Nomeação
   */
  dataAtoNomeacao?: Date;
  /**
   * Data do fim da vigência
   */
  fimVigencia?: Date;
  /**
   * Data do início da vigência
   */
  inicioVigencia?: Date;
  membro?: Membro[];
  /**
   * Número do Ato de Nomeação
   */
  numeroAtoNomeacao?: string;
}

/**
 * Membros da comissão de licitação
 */
export interface Membro extends BaseEntity<String> {
  /**
   * Código da atribuição do responsável pela licitação.
   */
  codAtribuicao?: number;
  /**
   * Natureza do Cargo
   */
  codNaturezaCargo?: number;
  /**
   * Número do CPF
   */
  numeroCpf?: string;
}

/**
 * Informar os anexos e/ou o edital em partes separadas (ex. parte 2 de 3)
 */
export interface EditalEAnexos extends BaseEntity<String> {
  /**
   * Código do tipo de documento enviado - Edital e Anexos, conforme tabela
   */
  codTipoEditalAnexos?: number;
  /**
   * Descrição
   */
  descricao?: string;
  /**
   * ID do arquivo enviado contendo o documento digitalizado
   */
  idDocumentoPDF?: string;
}

/**
 * – Cadastro de Lotes do Processo Licitatório
 */
export class Lote extends BaseEntity<String> {
  /**
   * Descrição do Lote
   */
  descricaoLote?: string;
  item?: Item[];
  /**
   * Número do Lote
   */
  numeroLote?: number;

  faseUm?:string;
}

/**
 * Cadastro de Itens do Processo Licitatório
 */
export interface Item extends BaseEntity<String> {
  /**
   * Código de Mercadoria ou Serviço dos itens
   */
  codigoUnicoMercadoriaOuServico?: number;
  /**
   * Código da origem do valor de referência
   */
  codOrigemValorReferencia?: number;
  /**
   * Código da unidade medida
   */
  codUnidadeMedida?: number;
  /**
   * Descrição
   */
  descricao?: string;
  /**
   * Descreve onde foi obtido o valor de referência.
   */
  descricaoOrigemValorReferencia?: string;
  /**
   * Número do Item
   */
  numeroItem?: number;
  /**
   * Indica se é o preço máximo
   */
  precoMaximo?: boolean;
  /**
   * Quantidade
   */
  quantidade?: number;
  /**
   * Quantidade desdobrada (quantas unidades contém a caixa / fardo / pacote)
   */
  quantidadeDesdobraUnidade?: number;
  /**
   * Valor de referência
   */
  valorDeReferencia?: number;
}

/**
 * Detalhar a natureza do objeto
 */
export interface NaturezaDoObjetoDetalhada extends BaseEntity<String> {
  /**
   * Detalhamento da natureza do objeto
   */
  codNaturezaObjetoDetalhada?: number;
  /**
   * Descrição da natureza do objeto quando for selecionado a Natureza do objeto = Outros
   */
  descricaoNaturezaObjetoOutros?: string;
}

/**
 * Parecer da Licitação
 */
export interface Parecer extends BaseEntity<String> {
  /**
   * Código do Tipo do parecer
   */
  codTipoParecer?: number;
  /**
   * Código IBGE do Estado onde foi realizado o registro no órgão de classe
   */
  codUfRegistroOrgaoDeClasse?: number;
  /**
   * Data do parecer
   */
  dataParecer?: Date;
  /**
   * Número do CPF
   */
  numeroCpf?: string;
  /**
   * Número do registro no órgão de classe
   */
  numeroRegistroOrgaoDeClasse?: string;
}

/**
 * Informação de todas as publicações do Edital ou Convite
 */
export interface Publicacao extends BaseEntity<String> {
  /**
   * Código do veículo da Publicação
   */
  codVeiculoPublicacao?: number;
  /**
   * Data da Publicação
   */
  dataPublicacao?: Date;
  /**
   * Descrição
   */
  descricao?: string;
  /**
   * ID do arquivo enviado contendo o documento digitalizado
   */
  idDocumentoPDF?: string;
}

/**
 * Detalhamento dos Recursos Orçamentários
 */
export interface RecursoOrcamentario extends BaseEntity<String> {
  /**
   * Código da origem do recurso
   */
  codOrigemRecurso?: number;
  dotacao?: Dotacao[];
  /**
   * ID do convênio
   */
  idConvenio?: number;
}

/**
 * Dotação orçamentária
 */
export interface Dotacao extends BaseEntity<String> {
  /**
   * Código da fonte de recursos
   */
  codFonteRecursos?: number;
  /**
   * Código da função
   */
  codFuncao?: number;
  /**
   * Código do órgão
   */
  codOrgao?: number;
  /**
   * Código do programa
   */
  codPrograma?: number;
  /**
   * Código da Subfunção
   */
  codSubFuncao?: number;
  /**
   * Código da unidade orçamentária
   */
  codUnidadeOrcamentaria?: number;
  /**
   * Natureza da Ação
   */
  naturezaAcao?: number;
  /**
   * Código da natureza da despesa
   */
  naturezaDespesa?: number;
  /**
   * Número do Projeto de Atividade
   */
  nroProjAtiv?: number;
  /**
   * Saldo atual da dotação orçamentária
   */
  saldoAtualDaDotacao?: number;
  /**
   * Subelemento da despesa
   */
  subelemento?: number;
  /**
   * Valor a ser utilizado
   */
  valorASerUtilizado?: number;
}

/**
 * Detalhamento dos Responsáveis pela licitação
 */
export interface Responsaveis extends BaseEntity<String> {
  /**
   * Código do tipo de responsabilidade
   */
  codTipoResponsabilidade?: number;
  /**
   * Número do CPF
   */
  numeroCpf?: string;
}
