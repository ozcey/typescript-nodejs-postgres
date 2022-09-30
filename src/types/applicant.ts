export interface IApplicant {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    age: number,
    gender: string,
    degree: string,
    categories: Array<string>,
    languages: Array<string>
};

export interface IAddress{
    street: string,
    city: string,
    state: string,
    zip_code: string
};