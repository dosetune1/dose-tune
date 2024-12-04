import { createServer } from './config/server.js';
import { connectDB } from './config/db.js';
import { findAvailablePort } from './utils/portHandler.js';
import orderRoutes from './routes/orders.js';

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    console.log('Database connection established');

    const app = createServer();
    
    // Routes
    app.use('/api/orders', orderRoutes);
    
    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Find available port
    const preferredPort = parseInt(process.env.PORT || '5000', 10);
    const port = await findAvailablePort(preferredPort);
    
    // Update API_URL if port changes
    if (port !== preferredPort) {
      process.env.PORT = port.toString();
      console.log(`Port ${preferredPort} was in use, using port ${port} instead`);
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();