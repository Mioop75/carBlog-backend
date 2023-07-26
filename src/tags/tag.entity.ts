import { PostEntity } from 'src/posts/post.entity';
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tag')
export class TagEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 20, unique: true })
	name: string;

	@ManyToMany(type => PostEntity, post => post.tags)
	@JoinTable({ name: 'post_id' })
	posts: PostEntity[];
}
