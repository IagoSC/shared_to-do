import { Group } from "../../database/entities/Group.entity";
import { dataSource } from "../../database";
import { UserGroup } from "../../database/entities/UserGroup.entity";
import { CreateGroupService } from "../../services/Group/CreateGroup";

const groupRepository = dataSource.getRepository(Group);
const userGroupRepository = dataSource.getRepository(UserGroup);

describe("Testing groups services", () => {
  test("Create Group Service", async () => {
    const newGroup = {
      description: "fake_description",
      usersIds: ["fake_user_id"],
      isDefault: false,
      name: "fake_name",
    };

    const result = await new CreateGroupService(
      groupRepository,
      userGroupRepository
    ).execute(newGroup);

    const groupReturn = await groupRepository.findBy({ id: result.id });
    const userGroupReturn = await userGroupRepository.findBy({
      groupId: result.id,
    });

    expect(groupReturn.length).toBe(1);
    expect(groupReturn[0].name).toBe(newGroup.name);
    expect(groupReturn[0].description).toBe(newGroup.description);
    expect(groupReturn[0].isDefault).toBe(newGroup.isDefault);

    expect(userGroupReturn.length).toBe(1);
  });
});
