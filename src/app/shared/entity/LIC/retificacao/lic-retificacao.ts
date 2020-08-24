import { BaseEntity } from '../../base-entity';

/**
 * Para retificar dados já homologados
 */
export interface LicRetificaHomolog extends BaseEntity<String>{
    /**
     * Tipo de retificação
     */
    codTipoRetificacao?: number;
    /**
     * ID do procedimento de compra ou alienação ou o contrato previamente informado
     */
    idProcedimentoOuContrato?: number;
    /**
     * Motivo da retificação de dados.
     */
    motivoRetificacao?: string;
}
