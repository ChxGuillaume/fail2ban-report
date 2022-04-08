import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bans } from './models/bans.entity';
import * as moment from 'moment';
import * as ini from 'ini';
import * as fs from 'fs';
import { DurationInputArg2 } from 'moment';

@Injectable()
export class AppService {
  private readonly config = ini.parse(
    fs.readFileSync(process.env.JAIL_CONF_PATH, 'utf-8'),
  );

  constructor(
    @InjectRepository(Bans)
    private bansRepository: Repository<Bans>,
  ) {}

  async getIps(): Promise<{ count: number; ips: string[] }> {
    const banTime = this.getBanTime('sshd');
    const checkTime = moment().subtract(banTime.time, banTime.unit).unix();

    const ips = await this.bansRepository.find({
      select: ['ip', 'jail', 'timeofban'],
      where: { timeofban: MoreThan(checkTime) },
    });

    return { count: ips.length, ips: ips.map((ip) => ip.ip) };
  }

  getConf(): any {
    return ini.parse(fs.readFileSync('/home/nekotiki/jail.conf', 'utf-8'));
  }

  getBanTime(jail: string): { time: number; unit: DurationInputArg2 } {
    const banTime = this.config[jail].bantime || this.config.DEFAULT.bantime;

    let spliced = <string[]>Array.from(banTime.matchAll(/(\d*)([A-z]*)/gm))[0];

    if (spliced.length) {
      spliced = spliced.slice(1, 3);
    }

    return {
      time: parseInt(spliced[0]),
      unit: <DurationInputArg2>spliced[1],
    };
  }
}
