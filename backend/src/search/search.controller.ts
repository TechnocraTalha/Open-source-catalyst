import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) { }

    @Get()
    async search(@Query('q') query: string = '') {
        if (!query) {
            // If no query, return all issues (limited)
            return this.searchService.searchAll();
        }
        return this.searchService.search(query);
    }
}
