import {
    Controller,
    Post,
    Headers,
    Req,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/backend';
import { PrismaService } from '../prisma/prisma.service';
import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/webhooks')
export class WebhooksController {
    private readonly logger = new Logger(WebhooksController.name);

    constructor(private readonly prisma: PrismaService) { }

    @Post()
    async handleWebhook(
        @Headers('svix-id') svixId: string,
        @Headers('svix-timestamp') svixTimestamp: string,
        @Headers('svix-signature') svixSignature: string,
        @Req() req: RawBodyRequest<Request>,
    ) {
        if (!svixId || !svixTimestamp || !svixSignature) {
            throw new BadRequestException('Missing Svix headers');
        }

        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

        if (!WEBHOOK_SECRET) {
            this.logger.error('CLERK_WEBHOOK_SECRET is not defined');
            throw new BadRequestException('Server configuration error');
        }

        // Get the raw body
        const payload = req.rawBody;

        if (!payload) {
            throw new BadRequestException('No body provided');
        }

        const wh = new Webhook(WEBHOOK_SECRET);
        let evt: WebhookEvent;

        // Verify the payload with the headers
        try {
            evt = wh.verify(payload.toString(), {
                'svix-id': svixId,
                'svix-timestamp': svixTimestamp,
                'svix-signature': svixSignature,
            }) as WebhookEvent;
        } catch (err) {
            this.logger.error('Error verifying webhook:', err);
            throw new BadRequestException('Error verifying webhook');
        }

        // Handle the event
        const eventType = evt.type;
        this.logger.log(`Received webhook event: ${eventType}`);

        if (eventType === 'user.created' || eventType === 'user.updated') {
            const { id, email_addresses, first_name, last_name, image_url } =
                evt.data;

            const primaryEmail = email_addresses && email_addresses.length > 0
                ? email_addresses[0].email_address
                : '';

            const userData = {
                id: id,
                email: primaryEmail,
                firstName: first_name || '',
                lastName: last_name || '',
                imageUrl: image_url || '',
            };

            if (eventType === 'user.created') {
                await this.prisma.user.create({
                    data: userData,
                });
                this.logger.log(`User created: ${id}`);
            } else {
                await this.prisma.user.update({
                    where: { id: id },
                    data: userData,
                });
                this.logger.log(`User updated: ${id}`);
            }
        } else if (eventType === 'user.deleted') {
            const { id } = evt.data;
            if (id) {
                await this.prisma.user.delete({
                    where: { id },
                });
                this.logger.log(`User deleted: ${id}`);
            }
        }

        return { success: true };
    }
}
