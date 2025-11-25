import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import type { Job } from 'bull';
import { SearchService } from '../search/search.service';

@Processor('issue-processing')
export class NlpProcessor {
    private readonly logger = new Logger(NlpProcessor.name);

    constructor(private searchService: SearchService) { }

    @Process('process-issue')
    async handleIssue(job: Job) {
        const issue = job.data;
        this.logger.debug(`Processing issue: ${issue.title}`);

        // 1. NLP Extraction (Simple Regex for now)
        const skills = this.extractSkills(issue.title + ' ' + issue.body);

        // 2. Complexity Scoring
        const complexity = this.calculateComplexity(issue);

        // 3. Transformation
        const transformedIssue = {
            id: issue.id,
            title: issue.title,
            body: issue.body,
            url: issue.url,
            repository: issue.repository.name,
            skills: [...new Set([...skills, ...issue.labels.nodes.map((l: any) => l.name)])],
            complexity: complexity.score,
            complexityLabel: complexity.label,
            createdAt: issue.createdAt,
            updatedAt: new Date().toISOString(),
        };

        // 4. Indexing
        try {
            await this.searchService.indexIssue(transformedIssue);
            this.logger.debug(`Indexed issue: ${issue.title}`);
        } catch (error) {
            this.logger.error(`Failed to index issue: ${issue.title}`, error);
        }
    }

    private extractSkills(text: string): string[] {
        const skills: string[] = [];
        const keywords = ['React', 'NestJS', 'Node.js', 'Python', 'Go', 'Rust', 'Svelte', 'Vue', 'Angular', 'TypeScript', 'JavaScript'];

        keywords.forEach(keyword => {
            if (new RegExp(`\\b${keyword}\\b`, 'i').test(text)) {
                skills.push(keyword);
            }
        });
        return skills;
    }

    private calculateComplexity(issue: any): { score: number; label: string } {
        let score = 50; // Base score

        // Adjust based on labels
        const labels = issue.labels.nodes.map((l: any) => l.name.toLowerCase());
        if (labels.includes('good first issue') || labels.includes('beginner')) {
            score -= 30;
        }
        if (labels.includes('help wanted')) {
            score -= 10;
        }
        if (labels.includes('bug')) {
            score += 10;
        }
        if (labels.includes('enhancement') || labels.includes('feature')) {
            score += 20;
        }

        // Adjust based on comments (more discussion = potentially more complex)
        if (issue.comments.totalCount > 10) {
            score += 10;
        }

        // Normalize
        score = Math.max(0, Math.min(100, score));

        let label = 'Medium';
        if (score < 30) label = 'Low';
        if (score > 70) label = 'High';

        return { score, label };
    }
}
