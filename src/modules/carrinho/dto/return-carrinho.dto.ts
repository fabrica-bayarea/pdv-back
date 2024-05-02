export class ReturnCarrinhoDto {
  clienteId: number;
  usuarioId?: number;
  subtotal?: number;

  toObject() {
    return {
      clienteId: this.clienteId,
      usuarioId: this.usuarioId,
      subtotal: this.subtotal,
    };
  }
}
