var firebaseConfig = {
      apiKey: "AIzaSyBPZaLTliatKAD4bK3xqr0k3t_4Ljob7AU",
      authDomain: "kwitter-d2e8d.firebaseapp.com",
      databaseURL: "https://kwitter-d2e8d-default-rtdb.firebaseio.com",
      projectId: "kwitter-d2e8d",
      storageBucket: "kwitter-d2e8d.appspot.com",
      messagingSenderId: "171116088421",
      appId: "1:171116088421:web:4de1728bf5f7c0033d4a8c"
    };
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function Send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_tag = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
message_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
like_button = "<button class = 'btn btn-warning' id = "+firebase_message_id+" value = "+like+" onclick = 'UpdateLike(this.id)'>";
span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like:"+like+"</span></button><hr>";
row = name_tag + message_tag + like_button + span_tag;
document.getElementById("output").innerHTML += row;

      } });  }); }
getData();


function UpdateLike(message_id)
{
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}


function LogOut()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}