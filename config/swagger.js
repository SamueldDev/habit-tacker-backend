



import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const options = {

definition: {
    openapi: '3.0.0',
    info: {
      title: 'Habit_tracker API',
      version: '1.0.0',
      description: 'API documentation for the Packsmart App',
    },

    servers: [
      {
        url: 'https://packsmart-app-backend-production.up.railway.app',
        description: 'Production Server',
      },
       {
        url: 'http://localhost:7000',
        description: 'Local Server development',
      },
    ],

     tags: [
      {
        name: "User",
        description: "Endpoints related to user registration and login",
      },
       {
    name: "Habits",
        description: "Habit management: create, complete, track history"
    }
    ],
     components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

       schemas: {

        
      }

    },
  },

  apis: [path.resolve(__dirname, '../routes/*.js')], // for ESM

};


const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // ✅ Serve the raw Swagger JSON here:
    app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
    });
}