export class ReturnFornecedorDto {
  readonly id: number;
  readonly nome_fantasia: string; // O nome do fornecedor
  readonly cnpj: string; // O CNPJ do fornecedor
  readonly tipo_pessoa: string; // O email do fornecedor
  readonly razao_social: string; // O telefone do fornecedor
  readonly inscricao_estadual: string; // O endereço do fornecedor
  readonly data_registro: string; // A data de nascimento do fornecedor
}
