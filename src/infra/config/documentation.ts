import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: INestApplication): INestApplication => {
  const config = new DocumentBuilder()
    .setTitle('Nest API B2B')
    .setDescription('API B2B Rebuild in Nest')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  return app;
};
