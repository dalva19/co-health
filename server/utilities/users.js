// const users = [];

// const addUser = ({ id, username, room, connectId }) => {
//   username = username.trim().toLowerCase();
//   room = room.trim().toLowerCase();

//   const existingUser = users.find(
//     (user) => user.room === room && user.username === username
//   );

//   if (!username || !room) return { error: "Username and room are required." };

//   const user = { id, username, room, connectId };

//   users.push(user);

//   console.log(users);

//   return { user };
// };

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if (index !== -1) return users.splice(index, 1)[0];
// };

// const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// module.exports = { addUser, removeUser, getUser, getUsersInRoom };

// export const findUserFromReqId = () => {};
