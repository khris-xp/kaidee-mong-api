import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));
const port = 8000;

app.use('/user', require('./routes/user.routes'));
app.use('/api', require('./routes/category.routes'));
app.use('/api', require('./routes/upload.routes'));
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/content.routes'));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to KAIDEE MONG API');
});

app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
});

const MONGODB_URL: string | undefined = process.env.MONGO_URL;

mongoose.connect(MONGODB_URL as string).then(() => console.log('MongoDB connected')).catch(err => console.log(err));