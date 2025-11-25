import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { IngestionService } from './ingestion.service';
import { NlpProcessor } from './nlp.processor';
import { IngestionController } from './ingestion.controller';
import { SearchModule } from '../search/search.module';

@Module({
    imports: [
        HttpModule,
        SearchModule,
        BullModule.registerQueue({
            name: 'issue-processing',
        }),
    ],
    providers: [IngestionService, NlpProcessor],
    controllers: [IngestionController],
    exports: [IngestionService],
})
export class IngestionModule { }
