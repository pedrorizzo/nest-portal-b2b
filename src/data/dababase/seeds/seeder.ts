import { Logger } from '@nestjs/common';
import { RootConfig } from 'src/infra/config/configuration';
import * as csv from 'csv-parser';
import * as path from 'path';
import * as fs from 'fs';

export class Seeder {
  private logger = new Logger();

  async bulkFromCsv(workbook: string, tableName: any): Promise<void> {
    this.logger.debug(`Start bulking ${workbook} on ${tableName} table`);
    try {
      const pool = RootConfig.pool;

      const { headers, rows } = await this.parseCsv(workbook);
      const tableColuns = headers[0].map((h) => `"${h}"`).toString();

      rows.map((row) => {
        //eslint-disable-next-line
        const query = `INSERT INTO ${tableName} (${tableColuns}) VALUES (${Object.keys(row).map((r, i) => '$' + `${i + 1}`)})`;
        const digest = Object.keys(row).map((key) => row[key]);

        pool.query(query, digest).then((result) => {
          this.logger.log(`Bulk: ${result}`);
        });
      });

      this.logger.debug(`Done bulking ${workbook} on ${tableName} table`);
    } catch (err) {
      this.logger.error(`Error bulking ${workbook} on ${tableName} table`);
      this.logger.error(err);
    }
  }

  async parseCsv(workbook: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const csvSeed = path.resolve(__dirname, 'source', `${workbook}`);
      const headers = [];
      const rows = [];

      fs.createReadStream(csvSeed)
        .pipe(csv({ separator: ';' }))
        .on('headers', (h) => {
          headers.push(h);
        })
        .on('data', (d) => rows.push(d))
        .on('end', () => {
          resolve({
            headers,
            rows,
          });
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
}
