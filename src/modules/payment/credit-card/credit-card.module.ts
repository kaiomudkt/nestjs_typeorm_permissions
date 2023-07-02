import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { BancoDoBrasilModule } from './banco-do-brasil/banco-do-brasil.module';
import { SantanderModule } from './santander/santander.module';
import { CaixaEconomicaFederalModule } from './caixa-economica-federal/caixa-economica-federal.module';
import { CreditCardService } from './credit-card.service';

@Module({
  providers: [CreditCardService],
  controllers: [CreditCardController],
  imports: [BancoDoBrasilModule, SantanderModule, CaixaEconomicaFederalModule]
})
export class CreditCardModule {}
