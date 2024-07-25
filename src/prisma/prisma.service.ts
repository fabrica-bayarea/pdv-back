import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  fichaTecnica: any;
  private _vendedor: any;
  ajusteEstoque: any;
  public get vendedor(): any {
    return this._vendedor;
  }
  public set vendedor(value: any) {
    this._vendedor = value;
  }
  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
