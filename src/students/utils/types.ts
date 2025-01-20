export type CreateUserParams = {
  name: string;
  password: string;
  email: string;
  profile_picture: string;
  active: boolean;
  section: number;
};

export type EditUserParams = {
  id: number;
  name: string;
  password?: string;
  email: string;
  profile_picture?: string;
  active: boolean;
  section?: number;
};
