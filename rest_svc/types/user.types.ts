interface IUserCreate {
  email: string;
  name: string;
  password: string;
  role: string;
  company: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export { IUserCreate, IUserLogin };
