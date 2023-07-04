import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { StoneModule } from './stone/stone.module';
import { CieloModule } from './cielo/cielo.module';
import { PagseguroModule } from './pagseguro/pagseguro.module';

@Module({
  providers: [],
  controllers: [CreditCardController],
  imports: [MercadoPagoModule, StoneModule, CieloModule, PagseguroModule],
})
export class CreditCardModule {}
