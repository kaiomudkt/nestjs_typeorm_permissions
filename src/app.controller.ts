import { Controller, Get } from '@nestjs/common';
import { SkipAuthou } from './infra/common/decorators/api-access-modifiers.decorator';

@Controller()
export class AppController {
  @Get('health-check')
  @SkipAuthou()
  getHello(): string {
    return 'The NEST.JS application is live!';
  }

  // TODO: checar se a conexão com o BD esta vivo
}
