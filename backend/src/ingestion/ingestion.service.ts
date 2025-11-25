import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);
  private readonly githubApiUrl = 'https://api.github.com/graphql';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectQueue('issue-processing') private processingQueue: any,
  ) { }

  async fetchIssues(query: string, variables: any = {}) {
    const token = this.configService.get<string>('GITHUB_PERSONAL_ACCESS_TOKEN');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.githubApiUrl,
          { query, variables },
          { headers },
        ),
      );

      const issues = response.data.data.search.edges;
      this.logger.log(`Fetched ${issues.length} issues`);

      // Push to Redis Queue
      for (const issue of issues) {
        await this.processingQueue.add('process-issue', issue.node);
      }

      return issues;
    } catch (error) {
      this.logger.error('Error fetching issues from GitHub', error);
      throw error;
    }
  }

  // Example query for "good first issues" in React
  async ingestInitialData() {
    const query = `
      query {
        search(query: "label:\\"good first issue\\" language:TypeScript state:open", type: ISSUE, first: 20) {
          edges {
            node {
              ... on Issue {
                id
                title
                body
                url
                createdAt
                comments {
                  totalCount
                }
                repository {
                  name
                  stargazerCount
                }
                labels(first: 10) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;
    return this.fetchIssues(query);
  }
}
