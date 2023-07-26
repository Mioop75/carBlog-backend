import slugify from 'slugify';
import { CommentEntity } from 'src/comments/comment.entity';
import { TagEntity } from 'src/tags/tag.entity';
import { UserEntity } from 'src/users/user.entity';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	preview: string;

	@Column({ type: 'text', unique: true })
	slug: string;

	@Column({ unique: true })
	title: string;

	@Column({ type: 'text' })
	text: string;

	@Column({ default: 0 })
	views: number;

	@ManyToOne(type => UserEntity, user => user.posts)
	@JoinColumn({ name: 'author_id' })
	author: UserEntity;

	@OneToMany(type => CommentEntity, comment => comment.post)
	comments: CommentEntity[];

	@ManyToMany(type => TagEntity, tag => tag.posts)
	@JoinTable({ name: 'tag_id' })
	tags: TagEntity[];

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	@BeforeUpdate()
	generateSlug() {
		this.slug = slugify(this.title, { lower: true });
	}
}
