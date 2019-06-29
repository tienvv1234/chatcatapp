'use strict';
const h = require('../helpers');

module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms;
  const pub = io.sockets.adapter.pubClient;
  const sub = io.sockets.adapter.subClient;
  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', () => {
      console.log('allrooms', allrooms);
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
      // sub.subscribe('getChatrooms');
    });

    socket.on('createNewRoom', newRoomInput => {
      console.log('newRoomInput', newRoomInput);
      // check to see if a room with the same title exists or not
      // if not, create one and broadcast it to everyone
      if (!h.findRoomByName(allrooms, newRoomInput)) {
        console.log(1111111111111111111);
        // Create a new room and broadcast to all
        allrooms.push({
          room: newRoomInput,
          roomID: h.randomHex(),
          users: []
        });

        console.log('allrooms', allrooms);

        // Emit an updated list to the creator (me)
        socket.emit('chatRoomsList', JSON.stringify(allrooms));
        // Emit an updated list to everyone connected to the rooms page (every one else)
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
        // pub.publish('chatRoomsList', JSON.stringify(allrooms));
      }
    });
  });

  io.of('/chatter').on('connection', socket => {
    socket.on('join', data => {
      let usersList = h.addUserToRoom(allrooms, data, socket);
      // Update the list of active users as shown on the chatroom page

      socket.broadcast
        .to(data.roomID)
        .emit('updateUsersList', JSON.stringify(usersList.users));
      socket.emit('updateUsersList', JSON.stringify(usersList.users));
    });

    // when a socket exits
    socket.on('disconnect', () => {
      // Find the room, to which the socket is connected to and purge the user
      let room = h.removeUserFromRoom(allrooms, socket);
      socket.broadcast
        .to(room.roomID)
        .emit('updateUsersList', JSON.stringify(room.users));
    });

    // when a new message arrives
    socket.on('newMessage', data => {
      socket.to(data.roomID).emit('inMessage', JSON.stringify(data));
    });
  });
};
