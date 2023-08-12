export interface IUserData {
    token:string
}
export type userContextType = {
    userData:IUserData,
    setUserData:(userData:IUserData)=>void
}