export interface IUserAdminUserData {
  username: string;
  password: string;
}

export const adminUserData: IUserAdminUserData = {
    username: "admin", 
    password: process.env.ADMIN_PASSWORD || "Admin123",
    // password: "Admin123",
}