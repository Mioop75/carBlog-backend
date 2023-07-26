import { PostEntity } from 'src/posts/post.entity';
import { UserEntity } from 'src/users/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'text' })
	text: string;

	@ManyToOne(type => UserEntity, user => user.comments)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity;

	@ManyToOne(type => PostEntity, post => post.comments)
	@JoinColumn({ name: 'post_id' })
	post: PostEntity;

	@CreateDateColumn()
	created_at: Date;
}
