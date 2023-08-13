

type UserRole = 'ADMIN'


interface changePasswordType {
    email: string
    old_password: string
    new_password
}

// register types
interface RegisterUserRequestType {
  first_name: string
  last_name: string
  email: string
}


// forgot password types
interface ForgotPasswordRequestType {
    email: string
}

interface ForgotPasswordResponseType {
  status: boolean;
  message: string;
  data: {
    email: string;
  };
}

// login types
interface LoginResponseType {
    data: {
      active: boolean;
      confirmed: boolean;
      created_at: string;
      email: string;
      first_name: string;
      id: number;
      last_name: string;
      role: UserRole;
      accessToken: string
    };
    message: string;
    status: boolean;
  }

  interface LoginRequestType {
    email: string
    password:string
}

// verify types
interface VerifyLinkRequestType {
  token: string
}


// save password types {
  interface SavePasswordRequestType {
    password: string;
    token: string | undefined
}

  