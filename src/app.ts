import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Book Application is Running 🎈');
});

app.use(globalErrorHandler);
app.use(notFound);
// console.log(process.cwd());
export default app;
