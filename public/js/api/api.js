const Port = '8080';
const IP = 'http://onlysocial.ddns.net:';


export class Api {
    static checkLogin = async () => {
        try {
            const response = await fetch(`${IP + Port}/users`, {
                method: 'GET', credentials: 'include',
            });
            const fetchedUser = await response.json();
            return fetchedUser.ID;
        } catch {
            return -1;
        }
    }

    static logIn = async (email, password) => {
        try {
            const request = JSON.stringify({Email: email, Password: password});
            const response = await fetch(`${IP + Port}/users`, {
                method: 'PUT',
                credentials: 'include',
                body: request,
            });
            const fetchedUser = await response.json();
            const result = {
                body: fetchedUser.ID,
                status: true
            };
            return result;
        } catch {
            const result = {
                body: '',
                status: false
            };
            return result;
        }
    }

    static logUp = async (email, password) => {
        try {
            const request = JSON.stringify({Email: email, Password: password});
            const response = await fetch(`${IP + Port}/users`, {
                method: 'POST',
                credentials: 'include',
                body: request,
            });
            const fetchedUser = await response.json();
            const result = {
                body: fetchedUser.ID,
                status: true
            };
            return result;
        } catch {
            const result = {
                body: '',
                status: false
            };
            return result;
        }        
    }

    static logOut = async () => {
        try {
            const response = await fetch(`${IP + Port}/users`, {
                method: 'DELETE',
                credentials: 'include',
            });
            return true;
        } catch {
            return -1;
        }        
    }

    static getLongProfile = async (id)  => {
        try {
            const response = await fetch(`${IP + Port}/profiles/${id.toString()}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            return data;
        } catch {
            return false;
        }
    }

    static getShortProfile = async (id) => {
        try {
            const response = await fetch(`${IP + Port}/profiles/${id.toString()}/shorts`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            return data;
        } catch {
            return false;
        }
    }

    static changeProfile = async (newUser) => {
        try {
            const request = JSON.stringify({
                FirstName: newUser.firstName,
                LastName: newUser.lastName,
                Birthday: newUser.birthday,
                City: newUser.city,
                Interests: newUser.interests,
                AboutUser: newUser.aboutUser,
                Gender: newUser.gender,
            });
            const response = await fetch(`${IP + Port}/profiles/${newUser.id.toString()}`, {
                method: 'PUT',
                credentials: 'include',
                body: request,
            });
            return true;
        } catch {
            return false;
        }
    }

    static findCandidate = async () => {
        try {
            const response = await fetch(`${IP + Port}/profiles/candidates`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await response.json();
            return data.Candidates;
        } catch {
            return false;
        }
    }
}

