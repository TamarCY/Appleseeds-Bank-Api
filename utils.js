const fs = require("fs");

const loadUsers = (id = undefined) => {
  try {
    const usersBuffer = fs.readFileSync("./users.json");
    const userJSON = usersBuffer.toString();
    const users = JSON.parse(userJSON);
    if (!id) {
      return users;
    } else {
      return users.find((user) => (user.id === +id)) 
    }
  } catch (e) {
    return [];
  }
};

const deleteUser = (id) => {};

module.exports = { loadUsers };
