import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';
import authRouter from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Serve main storefront static site from the same origin as the API.
const publicRoot = path.resolve(__dirname, '../../');
const assetsRoot = path.join(publicRoot, 'assets');
app.use('/assets', express.static(assetsRoot));
app.use('/css', express.static(path.join(assetsRoot, 'css')));
app.use('/js', express.static(path.join(assetsRoot, 'js')));

const htmlPages = ['index', 'shop', 'product', 'brands', 'cart', 'checkout', 'order-confirmation'];
app.get(['/:page', '/:page.html'], (req, res, next) => {
  if (req.path.startsWith('/api')) return next();

  const page = req.params.page?.replace(/\.html$/, '');
  if (!page || !htmlPages.includes(page)) return next();

  const htmlFile = path.join(publicRoot, `${page}.html`);
  if (fs.existsSync(htmlFile)) {
    return res.sendFile(htmlFile);
  }
  return next();
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicRoot, 'index.html'));
});

app.use(errorHandler);

export default app;
