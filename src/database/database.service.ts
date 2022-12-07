import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);
  conn: any;
  constructor(private configService: ConfigService) {
    this.conn = new Pool({
      user: 'postgres',
      host: 'containers-us-west-60.railway.app',
      database: 'railway',
      password: 'w92cI5sK8NuYeK3rNGUU',
      port: 6937,
    });
  }

  executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    this.logger.debug(`Executing query: ${queryText} (${values})`);
    return this.conn.query(queryText, values).then((result: QueryResult) => {
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows;
    });
  }
}
