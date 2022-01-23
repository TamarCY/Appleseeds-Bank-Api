const fs = require("fs");

// TODO: in this project, what input do we need to verify?

const loadUsers = (id = undefined) => {
  try {
    const usersBuffer = fs.readFileSync("./json/users.json");
    //TODO: WHY "./json/users.json" AND NOT "../json/users.json"
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

const creatUserObject = (id, cash = 0, credit = 0) => {
  return { id, cash, credit };
};

const setUsers = (users) => {
  try {
    const userJSON = JSON.stringify(users);
    fs.writeFileSync("./json/users.json", userJSON);
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
    users.push(newUser);
    setUsers(users);
    // return loadUsers();
    return newUser
    // TODO: what do I need to return 
  } catch (e) {
    return e;
  }
};

const deleteUserFunction = (id) => {
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

const isEnoughCredit = (user, amount) => {
  //   Why cant i do  (user.cash + user.credit)  >= amount? true : false
  const balance = user.credit + user.cash;
  return balance >= amount ? true : false;
};

const updateUser = (usersArray, id, amount, action) => {
  amount = action === "withdraw" ? -amount : amount;
  for (const user of usersArray) {
    if (user.id === +id) {
      user.cash = user.cash + amount;
      return usersArray;
    }
  }
  console.log("after"+ action + usersArray);
};

const withdraw = (usersArray, user, id, amount) => {
  if (!isEnoughCredit(user, amount)) {
    throw `There amount wanted is more then the balance: ${amount} cash:${user.cash}, credit:${user.credit}`;
  } else {
    const updatedArray = updateUser(usersArray, id, amount, "withdraw");
    setUsers(updatedArray)
    return loadUsers();
    //TODO: what do I need to return and from where
  }
};

const deposit = (usersArray, id, amount) => {
  const updatedArray = updateUser(usersArray, id, amount, "deposit");
  setUsers(updatedArray);
  return loadUsers();
  // TODO: whats better 2 lines or 1:
  // setUsers(updateUser(usersArray, id, amount, "deposit"))
};

const updateCredit = (newCredit, usersArray, id) => {
  if (newCredit < 0) {
    throw "Invalid credit data (less then 0)";
  } else {
    for (const user of usersArray) {
      if (user.id === +id) {
        user.credit = newCredit;
        break;
      }
    }
    setUsers(usersArray);
    return loadUsers();
  }
};
// TODO: add a function that find and update one object in an array????

const transfer = (givingId, receivingId, amount, user, usersArray) => {
  if (!receivingId) {
    throw "Invalid input - no receiving Id entered";
  }
  if (amount < 0) {
    throw "Invalid input - amount is less then 0";
  }
  withdraw(usersArray, user, givingId, amount);
  return deposit(usersArray, receivingId, amount);
};

const updateTransaction = ({transaction, amount, newCredit, receivingId}, id) => {
  if (!id) {
    throw "Invalid input - no ID entered";
  }
  const user = loadUsers(id);
  const usersArray = loadUsers();
  switch (transaction) {
    case "withdraw":
      return withdraw(usersArray, user, id, amount);
    case "deposit":
      return deposit(usersArray, id, amount);
    case "updateCredit":
      return updateCredit(newCredit, usersArray, id);
    case "transfer":
      return transfer(
        id,
        receivingId,
        amount,
        user,
        usersArray
      );
    default:
      throw "Invalid transaction";
  }
};

module.exports = {
  loadUsers,
  deleteUserFunction,
  addUser,
  updateTransaction,
  transfer
};
