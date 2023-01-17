import express from 'express'
import path from 'path'
// import cookieParser from 'cookieParser'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'



import indexRouter from './routes/index'
import usersRouter from './routes/users'
import mapGeneratorRouter from './routes/mapGenerator'

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mapGenerator', mapGeneratorRouter);

export default app
