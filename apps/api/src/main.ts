import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        rawBody: true, // Important for Clerk Webhooks verification
    });

    // Enable CORS for frontend communication
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    // Configure port
    const port = process.env.PORT || 4000;
    await app.listen(port);

    console.log(`🚀 API running on: http://localhost:${port}`);
}

bootstrap();
