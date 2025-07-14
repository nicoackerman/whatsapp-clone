export interface User {
  _id: string;
  userImage: string;
  userName: string;
  isContact: boolean;
}

export const users: User[] = [
  {
    _id: "1",
    userImage: "https://github.com/shadcn.png",
    userName: "Pepe",
    isContact: false,
  },
  {
    _id: "2",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    userName: "Carlos",
    isContact: true,
  },
  {
    _id: "3",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    userName: "María",
    isContact: false,
  },
  {
    _id: "4",
    userImage: "https://randomuser.me/api/portraits/men/65.jpg",
    userName: "John",
    isContact: true,
  },
  {
    _id: "5",
    userImage: "https://randomuser.me/api/portraits/women/23.jpg",
    userName: "Lucía",
    isContact: false,
  },
  {
    _id: "6",
    userImage: "https://randomuser.me/api/portraits/men/78.jpg",
    userName: "Mateo",
    isContact: false,
  },
  {
    _id: "7",
    userImage: "https://randomuser.me/api/portraits/women/51.jpg",
    userName: "Sophie",
    isContact: true,
  },
];
