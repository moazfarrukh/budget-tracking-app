
export interface ISession {
    refreshToken: string
  }
  
  
export interface IUser {
    firstName: string
    lastName: string,
    budget_limit: number,
    refreshToken: ISession[]
  }

  
export interface payload {
    _id: string;
}



export interface ReqUser {
    _id: string,
}
