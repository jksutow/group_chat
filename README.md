1) Have NodeJS server render views/index.ejs that has the html content for the client whenever the client requests "/"

2) In the client codes, have javascript code that asks the user for their name. Store the user input in a variable called name

  <script>
    var name = prompt('What is your name?');
  </script>

3) Have the client EMIT to the server an event called "got_a_new_user" and pass 'name' to the server

  <script>
    var name = prompt('What is your name?');
    io = io.connect();
    io.emit('got_a_new_user', {name: name});
  </script>

4) Have the server LISTEN for an event called "got_a_new_user". When this event gets triggered.

  4.1) have the server BROADCAST and event called "new_user" to the clients with the name of the new user attached to this event

    app.io.route('got_a_new_user', function(req){
      app.io.broadcast('new_user', {new_user_name: req.data.name});
    });

  4.2) we store the name/session_id of the new user in a variable/array/hash called users

    var users = {};
    users[]

  4.3) to the person who sent this request, we EMIT an event called 'existing_users' with all the users data

    app.io.route('got_a_new_user', function(req){
      app.io.broadcast('new_user', {new_user_name: req.data.name});
      req.io.emit('existing_users', users);
    });

5) Have the client LISTEN for an event called 'new_user' and when this event triggered, have jQuery render a new box with the new user's name

  <script>
    var name = prompt('What is your name?');
    io = io.connect();
    io.emit('got_a_new_user', {name: name});

    io.on('new_user', function(data){
      //render this info in the HTML
    });
  </script>

6) Detect when user disconnects from the socketIO connection. Have server LISTEN for an event called 'disconnect' and when this event gets triggered, broadcast an event 'disconnect_user' to all clients

7) We need to have the client LISTEN for an event called 'disconnect_user' and remove any html box associated with the user
