import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async indexIssue(issue: any) {
        return this.elasticsearchService.index({
            index: 'issues',
            document: issue,
        });
    }

    async search(text: string) {
        return this.elasticsearchService.search({
            index: 'issues',
            query: {
                multi_match: {
                    query: text,
                    fields: ['title', 'body', 'skills'],
                    fuzziness: 'AUTO',
                },
            },
        });
    }

    async searchAll() {
        return this.elasticsearchService.search({
            index: 'issues',
            size: 100,
            query: {
                match_all: {},
            },
        });
    }
}
