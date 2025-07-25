import type { User } from "../../types";
import { UserPreviewBox } from "./UserPreviewBox";

export default function UserList({ users }: { users: User[] }) {
  return (
    <div className="flex grow flex-col space-y-3">
      {users.map((user) => (
        <UserPreviewBox key={user._id} user={user} />
      ))}
    </div>
  );
}
