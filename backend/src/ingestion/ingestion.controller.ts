import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Controller('ingestion')
export class IngestionController {
    constructor(
        private ingestionService: IngestionService,
        private configService: ConfigService,
    ) { }

    @Post('webhook')
    async handleWebhook(
        @Body() payload: any,
        @Headers('x-hub-signature-256') signature: string,
    ) {
        // Verify signature
        // const secret = this.configService.get<string>('GITHUB_WEBHOOK_SECRET');
        // if (!this.verifySignature(payload, signature, secret)) {
        //   throw new UnauthorizedException('Invalid signature');
        // }

        if (payload.action === 'opened' || payload.action === 'edited') {
            // In a real scenario, we'd process the webhook payload directly
            // For now, we can trigger a fetch or process the payload if it matches our schema
            // this.ingestionService.processWebhookPayload(payload);
        }

        // Trigger manual ingestion for demo purposes
        if (payload.trigger === 'manual') {
            return this.ingestionService.ingestInitialData();
        }

        return { status: 'received' };
    }

    private verifySignature(payload: any, signature: string, secret: string): boolean {
        const hmac = crypto.createHmac('sha256', secret);
        const digest = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
        return signature === digest;
    }
}
