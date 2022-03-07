class User{
    constructor() {
        this.id = -1
    }
    id;
    email;
    password;
    firstName
    lastName
    birthday
    coords
    city
    interests
    aboutUser
    userId
    gender
    async checkLogin(){
        let response = await fetch('http://localhost:8080/user', {
            method: "GET",
            credentials: "include"
        })
        if(response.status === 401){
            return false
        }
        if(!response.ok){
            throw false
        }
        const fetchedUser = await response.json()
        this.id = fetchedUser.id
        return true
    }
    async logIn(){
        const request = JSON.stringify({email: this.email, password: this.password})
        let response = await fetch('http://localhost:8080/user', {
            method: "PUT",
            credentials: "include",
            body: request,
        })
        if(!response.ok){
            //TODO errors
            throw "Error"
        }
        const fetchedUser = await response.json()
        this.id = fetchedUser.id
        return this
    }
    async logUp(){
        const request = JSON.stringify({email: this.email, password: this.password})
        let response = await fetch('http://localhost:8080/user', {
            method: "POST",
            credentials: "include",
            body: request,
        })
        if(!response.ok){
            //TODO errors
            throw "Error"
        }
        const fetchedUser = await response.json()
        this.id = fetchedUser.id
        return this
    }
    async logOut(){
        const request = JSON.stringify({email: this.email, password: this.password})
        let response = await fetch('http://localhost:8080/user', {
            method: "DELETE",
            credentials: "include",
            body: request,
        })
        if(!response.ok){
            //TODO errors
            throw "Error"
        }
        this.id = -1
        return this
    }
    async longProfile(){

    }
    async shortProfile(){

    }
}

async function findCandidate(){
    
}

let user = new User("jwie", "iewucw")

function auth(){
    user.checkLogin().then(bool =>{
        if (bool){
            alert("OK " + user.id)
        }else{
            alert("NOT LOGGINED")
        }

    }).catch(msg =>{
        alert(msg)
    })
}

function logUp(){
    user.logUp().then(user =>{
        alert("OK " + user.id)
    }).catch(msg =>{
        alert(msg)
    })
}

function logIn(){
    user.logIn().then(user =>{
        alert("OK " + user.id)
    }).catch(msg =>{
        alert(msg)
    })
}

function logOut(){
    user.logOut().then(user =>{
        alert("OK " + user.id)
    }).catch(msg =>{
        alert(msg)
    })
}
