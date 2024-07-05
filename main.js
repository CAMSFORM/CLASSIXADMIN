const firebaseConfig = {
    apiKey: "AIzaSyB46Q51KpJCbCZeaeFDdS7FKTWc1HKN5bI",
    authDomain: "studentdetailsclassix.firebaseapp.com",
    databaseURL: "https://studentdetailsclassix-default-rtdb.firebaseio.com",
    projectId: "studentdetailsclassix",
    storageBucket: "studentdetailsclassix.appspot.com",
    messagingSenderId: "557336749433",
    appId: "1:557336749433:web:ff47f5705b086702827ba8"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  function Warning(correct,msg){
    console.log(correct , msg);
if(correct == 'success'){
  let toast = document.createElement('div');
toast.classList.add('toastgreen');
toast.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>' + msg;
document.getElementById('toastBox').appendChild(toast);
setTimeout(function(){
toast.remove();
console.log('it worked');
},6000);
}else{
  let toast = document.createElement('div');
toast.classList.add('toast');
toast.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>' + msg;
document.getElementById('toastBox').appendChild(toast);
setTimeout(function(){
toast.remove();
},6000);
}
}

function VerifyAuth(){
    var username = document.getElementById('username').value;
   var password = document.getElementById('password').value;
   var v_username = '';
   var v_password = '';
    if(username != '' && password != ''){
       var ref = firebase.database().ref('Auth/');
       ref.once('value' , function(get_data){
       var data = get_data.val();
       v_username = data.Username;
       v_password = data.Password;
       setTimeout(function(){
      
        if(v_password == password && v_username == username){
            localStorage.setItem('Verify','Yes');
            Warning('success','Auth Succesful !!');
            setTimeout(function(){
                window.location = 'admin.html';
            },6000);

        }else{
            Warning('jbc','Incorrect Username Or Password');
        }
       },2000);

       });
    }else{
        Warning('knd','Strings Are Missing');
    }
}
if(localStorage.getItem('Verify') != undefined){
    window.location = 'admin.html';
  }

