import { Entity, PrimaryColumn } from "typeorm";

type IConstructorUserGroup = {
  userId: string;
  groupId: string;
};

@Entity("users_groups")
export class UserGroup {
  constructor({ userId, groupId }: IConstructorUserGroup) {
    this.userId = userId;
    this.groupId = groupId;
  }

  @PrimaryColumn({ name: "group_id", type: "uuid" })
  groupId!: string;

  @PrimaryColumn({ name: "user_id", type: "uuid" })
  userId!: string;
}
