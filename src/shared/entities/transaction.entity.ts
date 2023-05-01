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
import { TransactionType } from '../dtos/transactions/transaction.dto';
import { User } from './user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'product_name' })
  productName: string;

  @Column()
  price: number;

  @Column({ name: 'transaction_date' })
  transactionDate: Date;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column()
  type: TransactionType;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'seller_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
