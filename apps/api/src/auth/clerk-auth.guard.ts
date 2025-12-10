import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { createClerkClient } from '@clerk/backend';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    private clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY,
    });

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid authorization header');
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        try {
            // Verify the session token
            const sessionClaims = await this.clerkClient.verifyToken(token, {
                jwtKey: process.env.CLERK_JWT_KEY,
            });

            // Attach user information to the request
            request.user = {
                userId: sessionClaims.sub,
                sessionId: sessionClaims.sid,
                claims: sessionClaims,
            };

            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
