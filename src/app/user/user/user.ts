import { Role } from '../../auth/auth.enum';
export interface IUser {
  _id: string;
  email: string;
  name: IName;
  picture: string;
  role: Role | string;
  userStatus: boolean;
  dateOfBirth: Date | null | string;
  level: number;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
  };
  phones: IPhone[];
}

export interface IName {
  first: string;
  middle?: string;
  last: string;
}

export enum PhoneType {
  None = 'none',
  Mobile = 'mobile',
  Home = 'home',
  Work = 'work',
}

export interface IPhone {
  type: PhoneType;
  digits: string;
  id: number;
}

export class User implements IUser {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id = '',
    public email = '',
    public name = { first: '', middle: '', last: '' } as IName,
    public picture = '',
    public role = Role.None,
    public dateOfBirth: Date | null = null,
    public userStatus = false,
    public level = 0,
    public address = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    public phones: IPhone[] = []
  ) { }

  static Build(user: IUser): User {
    if (!user) {
      return new User();
    }
    if (typeof user.dateOfBirth === 'string') {
      user.dateOfBirth = new Date(user.dateOfBirth);
    }

    return new User(
      user._id,
      user.email,
      user.name,
      user.picture,
      user.role as Role,
      user.dateOfBirth,
      user.userStatus,
      user.level,
      user.address,
      user.phones
    );
  }
}
