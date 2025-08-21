interface UserNameProps {
  username: string;
}

export default function UserName({ username }: UserNameProps) {
  return <p>{username}</p>;
}
