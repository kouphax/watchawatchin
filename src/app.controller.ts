import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
import { Principal } from './auth/principal.decorator';
import { JwtAnonymousAuthGuard } from './auth/jwt-anonymous-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(JwtAnonymousAuthGuard)
  @Render('index')
  root(@Principal() identity) {
    return {
      identity,
    };
  }

  @Get('secured')
  @UseGuards(JwtAuthGuard)
  @Render('secured')
  secured() {
    return;
  }

  @Get('sign-in')
  @Render('sign-in')
  @UseGuards(JwtAnonymousAuthGuard)
  signIn(@Principal() identity, @Res() response: Response) {
    if (identity.authenticated) {
      return response.redirect('/sign-out');
    }

    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @Redirect('/', 302)
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(req.user);
    response.cookie('AUTH', token, { httpOnly: true });
  }

  @UseGuards(JwtAnonymousAuthGuard)
  @Get('sign-out')
  @Redirect('/')
  async profile(
    @Principal() identity,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (identity.authenticated) {
      response.clearCookie('AUTH');
    }
  }
}
