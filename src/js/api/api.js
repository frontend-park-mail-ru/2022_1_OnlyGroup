const Port = '8080';
const IP = 'http://localhost:';

async function checkLogin(id) {
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
  return fetchedUser.id;
}

async function logIn(email, password) {
  const request = JSON.stringify({ Email: email, Password: password });
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
  return fetchedUser.id;
}

async function logUp(email, password) {
  const request = JSON.stringify({ Email: email, Password: password });
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
  return fetchedUser.id;
}

async function logOut() {
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

async function getLongProfile(id) {
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

async function shortProfile(id) {
  const response = await fetch(`${IP + Port}/profiles/${id.toString()}/short`, {
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

async function changeProfile(newUser) {
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

async function findCandidate() {
  const response = await fetch(`${IP + Port}/profiles/candidates`, {
    method: 'POST',
    credentials: 'include',
  });
  if (response.status === 401) {
    return false;
  }
  if (!response.ok) {
    // TODO errors
    throw { Error: 'error' };
  }
  const data = await response.json();
  return data.Candidates;
}
