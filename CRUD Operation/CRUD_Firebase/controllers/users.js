import {createUser, readUser, updateUser, deleteUser} from "../models/users.js"




async function setUser(req, res){
  createUser({name: `user${Date.now().toString().lastIndexOf(3)}`, age: `${Math.floor(Math.random() * (30 - 10 + 1)) + 10}`, exp: `${Math.floor(Math.random() * (15 - 1 + 1)) + 10}+ years`, id: Date.now()})
  return res.end();
}

async function getUser(req, res) {
  // Condition based
  // const data = await readUser("", "age", ">=", "25")
  const data = await readUser()
  return res.json(data)
}


async function editUser(req, res) {
  updateUser("R7dF26GUus0GgIgAiEF2", {
    age: "600",
    name: "edited",
    exp: "2060+ years"
  })
  return res.end();
}


async function removeUser(req, res) {
  deleteUser("R7dF26GUus0GgIgAiEF2")
  return res.end();
}

export {setUser, getUser, editUser, removeUser}