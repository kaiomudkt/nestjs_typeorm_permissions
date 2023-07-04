import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Module({
  providers: [MercadoPagoService]
})
export class MercadoPagoModule {}
