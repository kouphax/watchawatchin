import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAnonymousAuthGuard extends AuthGuard(['jwt', 'anonymous']) {}
