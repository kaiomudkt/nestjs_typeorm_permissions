import { Module } from '@nestjs/common';
import { CreditCardModule } from './credit-card/credit-card.module';
import { BoletoModule } from './boleto/boleto.module';
import { PixModule } from './pix/pix.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [CreditCardModule, BoletoModule, PixModule],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
