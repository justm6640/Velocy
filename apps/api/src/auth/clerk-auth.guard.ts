import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '@clerk/backend';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing authorization header');
        }

        const token = authHeader.split(' ')[1];

        try {
            // Utilisation de la fonction autonome verifyToken
            const claims = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY,
            });

            request.user = {
                userId: claims.sub,
                claims: claims,
            };

            return true;
        } catch (error) {
            console.error('Clerk Auth Error:', error);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
