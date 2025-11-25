import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class SavedIssue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    issueId: string; // GitHub Issue ID (Global Node ID)

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    repository: string;

    @ManyToOne(() => User, (user) => user.savedIssues)
    user: User;
}
