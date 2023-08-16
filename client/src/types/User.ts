
export interface userSignUpInfo {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    budgetLimit: number;
}

export interface userLoginInfo {
    email: string;
    password: string;
}

export interface IUserData {
    authenticated: boolean
}
export type userContextType = {
    userData: IUserData,
    setUserData: (userData: IUserData) => void
}