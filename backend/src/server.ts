import app from './app';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
import { env } from './env';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL 
    }
  }
});

async function initializeServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('Database connection established');

    // Start server using validated port
    const server = app.listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`);
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal: string) => {
      console.log(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log('Server closed');
        process.exit(0);
      });
      
      // Force close if hanging
      setTimeout(() => {
        console.error('Forcing shutdown...');
        process.exit(1);
      }, 5000);
    };

    // Handle signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (err: unknown) => {
      console.error('Unhandled Rejection:', err);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err: Error) => {
      console.error('Uncaught Exception:', err);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

  } catch (error) {
    console.error('Failed to initialize server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

initializeServer();