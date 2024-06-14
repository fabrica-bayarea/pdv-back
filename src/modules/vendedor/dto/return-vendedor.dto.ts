export class UpdateVendedorDTO {
    cpf?: string;
    email?: string;
    nome?: string;
    telefone?: string;
    endereco?: string;
    dataNascimento?: Date;
  
    toObject() {
      const updateObject: Record<string, any> = {};
      
      if (this.cpf !== undefined) updateObject.cpf = this.cpf;
      if (this.email !== undefined) updateObject.email = this.email;
      if (this.nome !== undefined) updateObject.nome = this.nome;
      if (this.telefone !== undefined) updateObject.telefone = this.telefone;
      if (this.endereco !== undefined) updateObject.endereco = this.endereco;
      if (this.dataNascimento !== undefined) updateObject.dataNascimento = this.dataNascimento;
      
      return updateObject;
    }
  }
  