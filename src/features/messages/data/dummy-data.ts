export interface Message {
  _id: string;
  messageType: "text" | "image" | "audio" | "video"; // puedes expandir si es necesario
  content: string;
  sender: string;
}

export interface Thread {
  _id: string;
  threadImage: string;
  threadName: string;
  participants: string[];
  _creationTime: number; // Unix timestamp
  lastMessage: Message;
  isOnline: boolean;
}

export const threads: Thread[] = [
  {
    _id: "1",
    threadImage: "https://github.com/shadcn.png",
    threadName: "Pepe",
    participants: ["Nicolas", "Pepe"],
    _creationTime: 1638232272, // 2021-11-30 12:04:32 UTC
    lastMessage: {
      _id: "1",
      messageType: "text",
      content: "Hello!",
      sender: "Pepe",
    },
    isOnline: true,
  },
  {
    _id: "2",
    threadImage: "https://github.com/shadcn.png",
    threadName: "Laura",
    participants: ["Nicolas", "Laura"],
    _creationTime: 1641024000, // 2022-01-01 00:00:00 UTC
    lastMessage: {
      _id: "2",
      messageType: "text",
      content: "Are you coming to the meeting?",
      sender: "Laura",
    },
    isOnline: false,
  },
  {
    _id: "3",
    threadImage: "https://github.com/shadcn.png",
    threadName: "Team Devs",
    participants: ["Nicolas", "Sofia", "Carlos", "Leo"],
    _creationTime: 1643655600, // 2022-02-01 14:00:00 UTC
    lastMessage: {
      _id: "3",
      messageType: "image",
      content: "project-preview.png",
      sender: "Carlos",
    },
    isOnline: true,
  },
  {
    _id: "4",
    threadImage: "https://github.com/shadcn.png",
    threadName: "Mom",
    participants: ["Nicolas", "Mom"],
    _creationTime: 1651334400, // 2022-05-01 00:00:00 UTC
    lastMessage: {
      _id: "4",
      messageType: "text",
      content: "Don’t forget your appointment!",
      sender: "Mom",
    },
    isOnline: false,
  },
  {
    _id: "5",
    threadImage: "https://github.com/shadcn.png",
    threadName: "Alex",
    participants: ["Nicolas", "Alex"],
    _creationTime: 1654012800, // 2022-06-01 00:00:00 UTC
    lastMessage: {
      _id: "5",
      messageType: "text",
      content: "Got the files, thanks!",
      sender: "Nicolas",
    },
    isOnline: true,
  },
];
