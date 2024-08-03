import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';

@Injectable()
export class PublicStrategyAuth extends PassportStrategy(Strategy, 'public') {
  constructor() {
    super();
  }

  authenticate(): void {
    this.success({ [Symbol.for('isPublic')]: true });
  }
}
