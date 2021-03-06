const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const MapLocationController = require('./controllers/MapLocationController');
const EventController = require('./controllers/EventController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');

// Create User
router.route('/createUser')
  .post(UserController.checkIfUserExists);

// Populates Map with Pins
router.route('/popups')
  .get(MapLocationController.getAllEvents);

// Updates User Info
router.route('/update')
  .put(UserController.updateUserProfile)

// Gets User's Saved Info
router.route('/update/:uid')
  .get(UserController.getUsersSavedInfo)

// Creates Event
router.route('/createEvent')
  .post(EventController.createEvent);

// Fetches all Events
router.route('/fetchAllEvents')
  .get(EventController.fetchAllEvents);

// Create Post for Events
router.route('/createPost')
  .post(PostController.createPost);

// Fetches all Posts By Event
router.route('/fetchAllPostsByEvent')
  .post(PostController.fetchAllPostsByEvent);

// Fetch event by ID
router.route('/fetchByEventID')
  .post(EventController.fetchByEventID);

// Create Comment for Post
router.route('/createComment')
  .post(CommentController.createComment);

// Fetches All Comments by Post
router.route('/fetchAllCommentsByPost')
  .post(CommentController.fetchAllCommentsByPost);

//Fetches All Events for a User
router.route('/fetchEventsByUser')
  .post(EventController.fetchEventsByUser);

//Fetch User Data
router.route('/getUserData')
  .post(UserController.getUserData);

// Fetch User from Post
router.route('/findUserFromPost')
  .post(PostController.fetchUserFromPost);

// Fetch User from Comment
router.route('/findUserFromComment')
  .post(CommentController.fetchUserFromComment);

// Update event information
router.route('/updateEventInfo')
  .put(EventController.updateEventInfo);

// Deletes an event
router.route('/deleteEvent/:id')
  .get(EventController.deleteEvent)

// Likes a comment
router.route('/likeComment')
  .put(CommentController.addLikeToComment);

router.route('/likePost')
  .put(PostController.addLikeToPost);

router.route('/allUsers')
  .get(UserController.allUsers);

module.exports = router;