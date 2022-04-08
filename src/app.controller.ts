import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index(): Promise<any> {
    const result = await this.appService.getIps();
    return {
      ...result,
      ipsText: result.ips.length ? result.ips.join('\n') : 'No IPs',
    };
  }

  @Get('ips')
  getIps(): any {
    return this.appService.getIps();
  }

  @Get('conf')
  getConf(): any {
    return this.appService.getConf();
  }
}
