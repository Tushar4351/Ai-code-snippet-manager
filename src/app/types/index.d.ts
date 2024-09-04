/* eslint-disable no-unused-vars */

// ====== USER PARAMS

declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icon: React.ReactNode;
}

interface SingleTagType {
  _id: string;
  clerkUserId: string;
  name: string;
}
interface SingleNoteType {
  id: string;
  clerkUserId: string;
  title: string;
  isImportant: boolean;
  tags: SingleTagType[];
  description: string;
  code: string;
  language: string;
  createdAt: string;
  isDeleted: boolean;
}

interface SingleCodeLanguageType {
  id: string;
  name: string;
  icon: React.ReactNode;
}
interface CodeLanguageCounterType {
  language: string;
  count: number;
}
