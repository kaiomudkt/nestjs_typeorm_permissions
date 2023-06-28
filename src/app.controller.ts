import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health-check')
  getHello(): string {
    return 'The nest.js application is live!';
  }

  // TODO: checar se a conexão com o BD esta vivo
}
