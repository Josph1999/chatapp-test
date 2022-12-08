import { ConfigService } from '@nestjs/config';
export declare class DatabaseService {
    private configService;
    private readonly logger;
    conn: any;
    constructor(configService: ConfigService);
    executeQuery(queryText: string, values?: any[]): Promise<any[]>;
}
