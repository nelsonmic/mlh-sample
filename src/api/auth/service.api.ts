import client, { noAuthClient } from '../config';


export const loginUser =  async (data: LoginRequestType): Promise<LoginResponseType> => {
      const res = await noAuthClient.post('/admin/login', data);

    return {
        ...res.data,
        data:{
            ...res.data.data,
            accessToken: res.headers.access_token,
        }
    }    
}

export const registerUser = async (data: RegisterUserRequestType) => {
    const res = await client.post('/admin/register', data);
    return res.data;
}

export const verifyLink = async (data: VerifyLinkRequestType) => {
 const res = await noAuthClient.get(`admin/register/verify/${data.token}`)

 return res.data
}

export const getProfile = async () => {
    const res = await client.get('/admin/profile');
    return res.data;
}

export const changePassword = async (data: changePasswordType) => {
    const res = await client.post('/admin/profile/password', data);
    return res.data;
}

export const savePassword = async (data: SavePasswordRequestType) => {
    const res = await noAuthClient.post(`/admin/register/password/${data.token}`, {
        password: data.password
    });
    return res.data;
  };


export const forgotPassword = async (data: ForgotPasswordRequestType): Promise<ForgotPasswordResponseType> => {
    const res = await noAuthClient.post('customer/forgot_password', data);
    return res.data;
}
