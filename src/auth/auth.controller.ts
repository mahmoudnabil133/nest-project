import { Controller, Get, Post, Request, UseGuards, Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
// import { Session } from 'inspector/promises';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req: any) {
        console.log(req.user);
        return  this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: any){
        return req.user;
    }

    @Get('')
    getMySession(@Session() session: Record<string, any>){
        console.log(session.id);
        session.authenticated = true;
        return session;
    }
}
