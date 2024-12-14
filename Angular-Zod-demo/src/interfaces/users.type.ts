export interface IUser {
    id: number;
    fullName: string;
    age?: number;
    gender: string;
    company: {
        name: string;
        address: string;
    };
    address: string;
}

export interface INewUser {
    [key: string] : {
        id: number;
    fullName: string;
    age?: number;
    gender: string;
    company: {
        name: string;
        address: string;
    };
    address: string;
    }
}