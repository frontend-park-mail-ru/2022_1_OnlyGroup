const Port = '8080';
const IP = 'http://localhost:';


export class userApi{
    static checkLogin = async function () {
        const response = await fetch(`${IP + Port}/users`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.status === 401) {
            return -1;
        }
        if (!response.ok) {
            throw false;
        }
        const fetchedUser = await response.json();
        return fetchedUser.ID;
    }

    static logIn = async function (email, password) {
        const request = JSON.stringify({Email: email, Password: password});
        const response = await fetch(`${IP + Port}/users`, {
            method: 'PUT',
            credentials: 'include',
            body: request,
        });
        if (!response.ok) {
            // TODO errors
            throw 'Error';
        }
        const fetchedUser = await response.json();
        return fetchedUser.ID;

    }

    static logUp = async function(email, password) {
        const request = JSON.stringify({Email: email, Password: password});
        const response = await fetch(`${IP + Port}/users`, {
            method: 'POST',
            credentials: 'include',
            body: request,
        });
        if (!response.ok) {
            // TODO errors
            throw 'Error';
        }
        const fetchedUser = await response.json();
        return fetchedUser.ID;
    }

    static logOut = async function () {
        const response = await fetch(`${IP + Port}/users`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!response.ok) {
            // TODO errors
            throw 'Error';
        }
        return true;
    }

    static getLongProfile = async function (id) {
        const response = await fetch(`${IP + Port}/profiles/${id.toString()}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.status === 401) {
            return false;
        }
        if (!response.ok) {
            throw false;
        }
        const data = await response.json();
        return data;
    }

    static getShortProfile = async function(id) {
        const response = await fetch(`${IP + Port}/profiles/${id.toString()}/shorts`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.status === 401) {
            return false;
        }
        if (!response.ok) {
            throw false;
        }
        const data = await response.json();
        return data;
    }

    static changeProfile = async function(newUser) {
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
        if (response.status === 401) {
            return false;
        }
        if (!response.ok) {
            throw false;
        }
        return true;
    }

    static findCandidate = async function () {
        const response = await fetch(`${IP + Port}/profiles/candidates`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.status === 401) {
            return false;
        }
        if (!response.ok) {
            // TODO errors
            throw {Error: 'error'};
        }
        const data = await response.json();
        return data.Candidates;
    }
}

