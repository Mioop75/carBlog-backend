import { CommentEntity } from 'src/comments/comment.entity';
import { PostEntity } from 'src/posts/post.entity';
import { RoleEntity } from 'src/roles/role.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	avatar: string;

	@Column({ unique: true })
	email: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column({ default: false })
	isVerified: boolean;

	@Column()
	activateLink: string;

	@ManyToOne(type => RoleEntity, role => role.users)
	@JoinColumn({ name: 'role_id' })
	role: RoleEntity;

	@OneToMany(type => PostEntity, post => post.author)
	posts: PostEntity[];

	@OneToMany(type => CommentEntity, comment => comment.author)
	comments: CommentEntity[];

	@CreateDateColumn()
	created_at: Date;
}
