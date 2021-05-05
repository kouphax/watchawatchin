// In anonymous.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-anonymous';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  authenticate() {
    return this.success({ authenticated: false });
  }
}
