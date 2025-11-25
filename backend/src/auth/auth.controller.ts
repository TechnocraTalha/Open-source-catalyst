import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @Get('github')
    @UseGuards(AuthGuard('github'))
    async githubLogin() {
        // Initiates the GitHub OAuth flow
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    async githubLoginCallback(@Req() req) {
        // Handles the callback and returns the user
        return req.user;
    }
}
