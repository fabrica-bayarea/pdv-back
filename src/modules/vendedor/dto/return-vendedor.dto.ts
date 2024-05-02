export class UpdateVendedorDTO {
    cpf?: string;
    email?: string;
    nome?: string;
    telefone?: string;
    endereco?: string;
    data_nascimento?: Date;
  
    toObject() {
      const updateObject: Record<string, any> = {};
      
      if (this.cpf !== undefined) updateObject.cpf = this.cpf;
      if (this.email !== undefined) updateObject.email = this.email;
      if (this.nome !== undefined) updateObject.nome = this.nome;
      if (this.telefone !== undefined) updateObject.telefone = this.telefone;
      if (this.endereco !== undefined) updateObject.endereco = this.endereco;
      if (this.data_nascimento !== undefined) updateObject.data_nascimento = this.data_nascimento;
      
      return updateObject;
    }
  }
  