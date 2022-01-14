const fs = require("fs");
const { threadId } = require("worker_threads");

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

const creatUserObject = (id, cash = 0, credit = 0) => {
  return { id, cash, credit };
};

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

const isEnoughCredit = (user, amount) => {
  //   Why cant i do  (user.cash + user.credit)  >= amount? true : false
  const balance = user.credit + user.cash;
  return balance >= amount ? true : false;
};

const updateWithdraw = (usersArray, id, amount) => {
     for (const user of usersArray){
         if(user.id === +id){
             user.cash = user.cash - amount;
             console.log(`user ${id} updated cash is ${user.cash}`);
             return usersArray;
         }
     }
}

const withdraw = (usersArray, user, transactionObject, id) => {
    if(!isEnoughCredit(user, transactionObject.amount)){
        throw (`There amount wanted is more then the balance: ${transactionObject.amount} cash:${user.cash}, credit:${user.credit}`)
    } else {
      const updatedArray = updateWithdraw(usersArray, id, transactionObject.amount);
      setUsers(updatedArray);
      return (updatedArray)
    }
}

const updateUser = (transactionObject, id) => {
  if (!id) {
    throw "Invalid input - no ID entered";
  }
  const user = loadUsers(id);
  const usersArray = loadUsers();
  switch (transactionObject.transaction) {
    case "withdraw":
       return  withdraw (usersArray, user, transactionObject, id);
    case "deposit":
      console.log("deposit");
      break;
    case "updateCredit":
      console.log("update");
      break;
    case "transfer":
      console.log("transfer");
      break;
    default:
      throw "Invalid transaction";
  }
  return user;
};

module.exports = { loadUsers, deleteUser, addUser, updateUser };
