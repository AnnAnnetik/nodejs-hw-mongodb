import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();

// mongodb+srv://eWP8Vn4WbnqaxHoC:<password>@cluster0.c87ywqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
/*<password>  eWP8Vn4WbnqaxHoC */
