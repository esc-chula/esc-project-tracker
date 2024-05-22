import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
    export default Notification{
    @PrimaryGeneratedColumn('uuid')
    id: string;
}