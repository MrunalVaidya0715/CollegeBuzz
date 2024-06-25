export interface User{
    _id: string;
    username: string;
    role: "user" | "admin";
    email: string;
    profileImg: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    _v: number;
}