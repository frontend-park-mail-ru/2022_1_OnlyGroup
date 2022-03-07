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
    city
    interests
    aboutUser
    userId
    gender
    async checkLogin(){
        let response = await fetch('http://localhost:8080/users', {
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
        let response = await fetch('http://localhost:8080/users', {
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
        let response = await fetch('http://localhost:8080/users', {
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
        let response = await fetch('http://localhost:8080/users', {
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

    async getLongProfile(){
        let response = await fetch('http://localhost:8080/profiles/' +  this.id.toString(),{
            method: "GET",
            credentials: "include",
        })
        if(response.status === 401){
            return false
        }
        if(!response.ok){
            throw false
        }
        const data = await response.json()
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.birthday = data.birthday
        this.city  = data.city
        this.interests = data.interests
        this.userId = data.userId
        this.gender = data.gender
        this.aboutUser = data.aboutUser

        return this
    }

    async shortProfile(){
        let response = await fetch('http://localhost:8080/profiles/' + this.id.toString() + "/short",{
            method: "GET",
            credentials: "include",
        })
        if(response.status === 401){
            return false
        }
        if(!response.ok){
            throw false
        }
        const data = await response.json()
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.city  = data.city
        return this
    }

    async changeProfile(User){
        const request = JSON.stringify({firstName: User.firstName,
            lastName: User.lastName,
            birthday: User.birthday,
            city: User.city,
            userId: User.userId,
            interests: User.interests,
            aboutUser: User.aboutUser,
            gender: User.gender});
        alert(request)
        let response = await fetch('http://localhost:8080/profiles/' + this.id.toString(),{
            method: "PUT",
            credentials: "include",
            body: request,
        })
        if(!response.ok){
            return false
        }
        this.firstName = User.firstName
        this.lastName = User.lastName
        this.birthday = User.birthday
        this.city  = User.city
        this.interests = User.interests
        this.userId = User.userId
        this.gender = User.gender
        this.aboutUser = User.aboutUser
        return this
    }
}

async function findCandidate(){
    let response = await fetch('http://localhost:8080/profiles/candidates',{
        method: "POST",
        credentials: "include",
    })
    if(!response.ok){
        //TODO errors
        throw "Error"
    }
    const data = await response.json()
    let vector = data.candidates
    return vector
}


let user = new User()

function getProfile(){
    user.getLongProfile().then(user =>{
        alert("OK " + user.id + " " + user.aboutUser + " " + user.birthday + " " + user.lastName + " " + user.city)
    }).catch(msg =>{
        alert(msg)
    })
}

function getShortProfile(){
    user.shortProfile().then(user =>{
        alert("OK " + user.id + " " + user.lastName)
    }).catch(msg =>{
        alert(msg)
    })
}

function CandidateVector(){
    findCandidate().then(users =>{
        alert("OK " + users)
    }).catch(msg =>{
        alert(msg)
    })
}


function userFromVector(){
    findCandidate().then(vector => {
        let user1 = new User()
        user1.id = vector[0]
        let user2 = new User()
        user2.id = vector[1]
        let user3 = new User()
        user3.id = vector[2]
        user1.getLongProfile().then(user => {
            alert("OK " + user.aboutUser)
        })
        user2.getLongProfile().then(user => {
            alert("OK " + user.aboutUser)
        })
        user3.getLongProfile().then(user => {
            alert("OK " + user.aboutUser)
        })
    })
}

function changeProfile(){
    let user23 = new User()
    user23 = user
    user23.lastName = "kdv"

    user.changeProfile(user23).then(users =>{
        alert("OK " + users.id + " " + users.lastName)
    }).catch(msg =>{
        alert(msg)
    })
}




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
    user.password = "0"
    user.email = "petrenko"
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
