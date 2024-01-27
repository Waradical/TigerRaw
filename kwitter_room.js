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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function AddRoom()
{
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location("kwitter_page.html");
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      row = "<div class='room_name' id="+Room_names+" onclick='RedirectToRoomName(this.id)'> #"+Room_names+" </div> <hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function RedirectToRoomName(name)
{
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function LogOut()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}