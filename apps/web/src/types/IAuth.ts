export interface IRegister{
    name: string;
    email: string;
    password: string;
    phone: string;
}

export interface ILogin {
    email: string;
    password: string;
}


export type AuthFormProps =
  | {
      type: 'register';
      onSubmit: (data: IRegister) => Promise<IResponse>;
    }
  | {
      type: 'login';
      onSubmit: (data: ILogin) => Promise<IResponse>;
    };


export interface IResponse{
    success:boolean,
    message:string,
    data?:User
}


export interface Transaction{
    type:string,
    amount:number,
    senderId?:string,
    recieverId?:string,
}

export interface User{
    id:string,
    email:string,
    phone:string,
    name:string,
    balance:number,
    tranctions:Transaction[]
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}