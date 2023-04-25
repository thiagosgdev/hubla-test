import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionType } from '../dtos/transactions/transaction.dto';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'product_name' })
  productName: string;

  @Column()
  price: number;

  @Column({ name: 'transaction_date' })
  transactionDate: string;

  @Column({ name: 'seller_id' })
  sellerId: string;

  @Column()
  type: TransactionType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
