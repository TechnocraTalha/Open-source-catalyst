import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SavedIssue } from '../issues/saved-issue.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    githubId: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true })
    accessToken: string;

    @Column('simple-array', { nullable: true })
    skills: string[];

    @OneToMany(() => SavedIssue, (savedIssue: SavedIssue) => savedIssue.user)
    savedIssues: SavedIssue[];
}
