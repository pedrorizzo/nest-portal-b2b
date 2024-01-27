import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export class SwaggerDoc {
  setupDocs(app: INestApplication) {
    const title = 'API B2B NestJS';
    const description = 'B2B API rebuild in NestJS';
    const version = '1.0.0';
    const serverUrl = process.env.API_HOST;

    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBasicAuth();

    if (serverUrl) {
      config.addServer(serverUrl);
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../docs/resources/indexed')(config);

    const swagger = config.build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('docs', app, document);
    fs.writeFileSync('./swagger-docs.json', JSON.stringify(document));
  }
}
