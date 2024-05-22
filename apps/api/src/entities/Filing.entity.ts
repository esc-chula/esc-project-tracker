import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project.entity";
import { DocStatus } from "../constant/enum";

@Entity()
export class Filing {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Project, { onDelete: 'CASCADE' })
    project: Project

    @Column(
        {
            type: 'enum',
            enum: DocStatus
        }
    )
    status: DocStatus

    @Column()
    projectCode: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn({ nullable: true, default: null })
    updatedAt: Date
}