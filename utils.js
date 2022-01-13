const fs = require("fs");

const loadUsers = (id = undefined) => {
  try {
    const usersBuffer = fs.readFileSync("./users.json");
    const userJSON = usersBuffer.toString();
    const users = JSON.parse(userJSON);
    if (!id) {
      return users;
    } else {
      return users.find((user) => user.id === +id);
    }
  } catch (e) {
    return [];
  }
};

const checkIfUserExists = (user, data) => {
  if (data.some((element) => element["id"] === user.id)) {
    throw "User already exists";
  }
};

const checkUserData = (user) => {
  if (!user.id) {
    throw "Invalid input - no ID entered";
  }
  if (user.cash < 0) {
    throw "Invalid input - cash is less then 0";
  }
  if (user.credit < 0) {
    throw "Invalid input - credit is less then 0";
  }
};

const creatUserObject = (id, cash=0, credit=0) => {
 return {id, cash, credit}
}

const setUsers = (users) => {
  try {
    const userJSON = JSON.stringify(users);
    fs.writeFileSync("./users.json", userJSON);
  } catch (e) {
    return e;
  }
};

const addUser = (user) => {
  try {
    checkUserData(user);
    const users = loadUsers();
    checkIfUserExists(user, users);
    const newUser = creatUserObject(user.id, user.cash, user.credit);
    console.log(newUser);
    users.push(newUser);
    setUsers(users);
    return loadUsers();
  } catch (e) {
    return e;
  }
};

const deleteUser = (id) => {
  try {
    const users = loadUsers();
    const filteredArr = users.filter((user) => user.id !== id);
    if (users.length === filteredArr.length) {
      throw "Id not found";
    }
    setUsers(filteredArr);
    return loadUsers();
  } catch (e) {
    return e;
    // Can I do this?
  }
};

module.exports = { loadUsers, deleteUser, addUser };
