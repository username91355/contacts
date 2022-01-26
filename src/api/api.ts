export const api = {

    async me(): Promise<IMe | null> {

        return await fetch('http://localhost:7542/me', {
            method: 'GET'
        })
            .then((data) => data.json())
            .then(res => (Object.keys(res).length === 0) ? null : res);
    },

    async login(email: string, password: string): Promise<IUser> {

        const data = {"id": 1, "email": email, "password": password};

        return await fetch('http://localhost:7542/me', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => data.json())
    },

    async logout(): Promise<{}> {

        return await fetch('http://localhost:7542/me', {
            method: 'PUT',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data) => data.json());
    },

    async getContact(term: string = ''): Promise<IUser[]>  {
        return await fetch(`http://localhost:7542/contacts?q=${term}`)
            .then(res => res.json());
    },

    async addContact(data: IUser): Promise<IUser> {

        return await fetch('http://localhost:7542/contacts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json());
    },

    async editContact(id: number, data: IUser): Promise<IUser> {

        return await fetch(`http://localhost:7542/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json());
    },

    async removeContact(id: number): Promise<IUser> {

        return await fetch(`http://localhost:7542/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json());
    },
};

export interface IMe {
    id: number
    email: string
    password: string
}

export interface IUser {
    id: number
    name: string,
    email: string,
    phone: string
}