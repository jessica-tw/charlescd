/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DynamicModule, INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as rTracer from 'cls-rtracer'
import * as hpropagate from 'hpropagate'
import * as morgan from 'morgan'
import { AppModule } from './app/app.module'
import { AppConstants } from './app/v2/core/constants'
import { EntityNotFoundExceptionFilter } from './app/v2/core/filters/entity-not-found-exception.filter'
import { ConsoleLoggerService } from './app/v2/core/logs/console'
import { Request, Response, Router } from 'express'
import { HttpExceptionFilter } from './app/v2/core/filters/http-exception.filter'
import * as bodyParser from 'body-parser'
import { Configuration } from './app/v2/core/config/configurations'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express'
import * as https from 'https'
import * as http from 'http'

const healtCheckRouter = Router()
healtCheckRouter.get('/healthcheck', (_req: Request, res: Response) : void => {
  res.send({
    'status': 'ok'
  })
})

async function bootstrap() {
  console.log(AppConstants.TLS_KEY)
  console.log(AppConstants.TLS_CERT)
  const httpsOptions = {
    key: AppConstants.TLS_KEY,
    cert: AppConstants.TLS_CERT
  }
  hpropagate({
    setAndPropagateCorrelationId: false,
    headersToPropagate: [
      AppConstants.DEFAULT_CIRCLE_HEADER_NAME
    ]
  })

  const appModule: DynamicModule = await AppModule.forRootAsync()
  const server = express()
  const app = await NestFactory.create(
    appModule,
    new ExpressAdapter(server),
  )
  await app.init()
  const logger = app.get<ConsoleLoggerService>(ConsoleLoggerService)
  const options = new DocumentBuilder()
    .setTitle('Charles Butler')
    .setDescription('Charles butler documentation')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  app.use(bodyParser.json({ limit: Configuration.requestSizeLimit }))
  app.use(morgan('dev'))
  app.use(morgan('X-Circle-Id: :req[x-circle-id]'))
  app.useGlobalFilters(new EntityNotFoundExceptionFilter(logger))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(rTracer.expressMiddleware())
  app.use(healtCheckRouter)
  SwaggerModule.setup('/api/swagger', app, document)
  app.enableShutdownHooks()
  http.createServer(server).listen(3000)
  https.createServer(httpsOptions, server).listen(443)
}

bootstrap()
