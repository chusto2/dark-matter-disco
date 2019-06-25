const express = require('express');
const router = express.Router();
const { storeFriendRequest, updateStatus, getPendingRequests, getUserByUsername, acceptFriendRequest } = require('../../database-postgres/helpers.js');

//setup get request for friend invitations
router
  .get('/request/:username', (req, res) => {  
    //get user by username
    const username = req.params.username;
    //call helper to find user by username
    getUserByUsername(username)
      .then((user) => {
        //call helper to find a user's pending friend requests
        getPendingRequests(user.username).then((results) => {
          //send list of pending friend requests to client
          res.send(results);
        });
    })
  })

  //setup post request for friend invitations
  .post('/request', (req, res) => {
    const username =  req.body.username;
    const friendName = req.body.friendName;
    
    //call helper to save pending requests
    storeFriendRequest(username, friendName);
    //send 201 status code
    res.send(201);
  })
  //setup post for accepted friends
  .put('/request', (req, res) => {
    // storeFriendRequest(2, 1).then(() => {
    const username =  req.body.username;
    const friendName = req.body.friendName;
    acceptFriendRequest(username, friendName);
    // storeFriendRequest(friendName, username);
    // acceptFriendRequest(friendName, username);
    // updateStatus(friendName, username);
    // });
    // acceptFriendRequest(1, 3);
    res.send(202);
  })



module.exports = router;