import UserEntity from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskState {
  OPENED = 'opened',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

@Entity('task')
class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @Column({ type: 'enum', enum: TaskState, default: TaskState.OPENED })
  state: TaskState;

  @Column({ type: 'timestamp', name: 'date' })
  date: string;

  @Column({ type: 'varchar', name: 'authorId' })
  authorId: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date;
}

export default TaskEntity;
