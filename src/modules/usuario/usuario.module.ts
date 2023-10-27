import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Module({
    providers: [UsuarioService],
    exports: [UsuarioService],
    
})
export class UsuarioModule {

}
