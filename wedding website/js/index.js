// const { start } = require("@popperjs/core");

const firebaseConfig = {
    apiKey: "AIzaSyCUBMNiPuiZEdf-WApcqkqWJXUhZlE2Opw",
    authDomain: "event-planner-udaipur.firebaseapp.com",
    projectId: "event-planner-udaipur",
    storageBucket: "event-planner-udaipur.appspot.com",
    messagingSenderId: "234872477923",
    appId: "1:234872477923:web:c7d1038fbe105ef0328dd6",
    measurementId: "G-WHDMYJTDYD"
  };

  firebase.initializeApp(firebaseConfig);
  let database=firebase.firestore();
  let username;
  let userimage;
  let userid;

 

//   Event section data 

function loadevents(){

  let eventbox=document.querySelector("#event-box-container");

  database.collection("events").get().then((querySnapshot) =>{
    querySnapshot.forEach(doc => {

        var data=doc.data();
        var name=doc.id;
        var image=data.image;

        const boxdiv=document.createElement('div');
        const eimage=document.createElement('img');
        const infodiv=document.createElement('div');
        const eventh=document.createElement('h3');
        const btna=document.createElement('a');

        eimage.setAttribute('src',image);
        eventh.innerHTML=name;
        btna.innerHTML='Search Venues';
        btna.setAttribute('class','btn');
        btna.setAttribute('onclick','venuelistid(this.id)');
        btna.setAttribute('id',name);
        boxdiv.setAttribute('class','box');
        infodiv.setAttribute('class','info');
        infodiv.appendChild(eventh);
        infodiv.appendChild(btna);
        boxdiv.appendChild(eimage);
        boxdiv.appendChild(infodiv);

        eventbox.appendChild(boxdiv);


    });


});

}



// Venue section data

function loadvenues(){

  let venuebox=document.querySelector("#venue-box-container");

  database.collection("venues").get().then((querySnapshot) =>{
    querySnapshot.forEach(doc => {

        var data=doc.data();
        var docid=doc.id;
        var name=data.name;
        var image=data.image;

        const boxdiv=document.createElement('div');
        const eimage=document.createElement('img');
        const infodiv=document.createElement('div');
        const eventh=document.createElement('h3');
        const btna=document.createElement('a');

        eimage.setAttribute('src',image);
        eventh.innerHTML=name;
        btna.innerHTML='See More';
        btna.setAttribute('class','btn');
        // btna.setAttribute('href','venueDetail.html');
        btna.setAttribute('onclick','Venuedetailid(this.id)');
        btna.setAttribute('id',docid);
        boxdiv.setAttribute('class','box');
        infodiv.setAttribute('class','info');
        infodiv.appendChild(eventh);
        infodiv.appendChild(btna);
        boxdiv.appendChild(eimage);
        boxdiv.appendChild(infodiv);

        venuebox.appendChild(boxdiv);


    });


});

}



// form handled

function formSubmit(){
    // alert("function reached");
    // window.preventDefault();
    let form = document.getElementById('feedform');
    const Name=form.elements['feedname'].value;
    const mail=form.elements['feedmail'].value;
    const number=form.elements['feednumber'].value;
    const address=form.elements['feedaddress'].value;
    const feedback=form.elements['feedmessage'].value;


    console.log(Name);
    // alert(Name);

   database.collection("feedback").add({
       name:Name,
       email:mail,
       contact:number,
       address:address,
       message:feedback,
       timestamp: firebase.firestore.FieldValue.serverTimestamp()
   })
   .then(()=>{
       console.log("data added successfully");
       alert("Message Sent Successfully");
   })
   .catch((error) => {
    console.log("Error writing document: ", error);
  });
}


function Venuedetailid(id){
  sessionStorage.venueid=id;
  window.location.href="venueDetail.html";
}

function venuerender(){

  let container=document.querySelector('.container');
  console.log(container);
  container.style.visibility='invisible';

  // const probar=document.querySelector('.circular');
  // probar.style.visibility="visible";
  let carouseldiv=document.querySelector('#carousel-inner-div');
  // alert(sessionStorage.venueid);
  database.collection("venues").doc(sessionStorage.venueid).get().then((doc)=>{
        const data=doc.data();
        const images=data.moreVenueImages;
        const name=data.name;
        const rate=data.rating;
        const address=data.address;
        const desc=data.description;
        const cater=data.cateringCharge;
        const rooms=data.rooms;
        const price=data.charges24;
        sessionStorage.providerName=data.providerName;
        sessionStorage.providerContact=data.providerContact;
        sessionStorage.venueName=data.name;

        for(let i=0;i<images.length;i++){
          console.log(images[i]);
          
        const boxdiv=document.createElement('div');
        const eimage=document.createElement('img');

        eimage.setAttribute('src',images[i]);
        if(i==0)
         boxdiv.setAttribute('class','carousel-item active');
        else
         boxdiv.setAttribute('class','carousel-item');
        eimage.setAttribute('class','d-block');
        boxdiv.appendChild(eimage);

        carouseldiv.appendChild(boxdiv);

        }

        console.log(rate);

        const hname=document.querySelector('#venue-name');
        const haddress=document.querySelector('#venue-address');
        const hrate=document.getElementById('venue-rating');
        const hdesc=document.querySelector('#venue-description');
        const hcater=document.querySelector('#venue-cater');
        const hrooms=document.querySelector('#venue-rooms');
        const hprice=document.querySelector('#venue-price');
        hname.innerHTML=name+hname.innerHTML;
        haddress.innerHTML=address+haddress.innerHTML;
        hrate.innerHTML+=rate;
        hdesc.innerHTML=desc;
        hcater.innerHTML="Rs "+cater;
        hrooms.innerHTML=rooms+" Rooms";
        hprice.innerHTML= "Rs "+price;

        console.log(hrate);
        
  // probar.style.visibility="invisible";
  container.style.visibility="visible";


        

  })
}

function venuelistid(id){
  sessionStorage.venuelistid=id;
  window.location.href="Venue.html";
}

function venuelistrender(){
  let venuebox=document.querySelector("#venue-box-container-2");
  document.querySelector('#venue-list-heading').innerHTML=sessionStorage.venuelistid;
  // const venues;
  // let boxcontainer1=document.querySelector('#client-container-1');
  // let boxcontainer2=document.querySelector('#client-container-2');
  database.collection('events').doc(sessionStorage.venuelistid).get().then((doc)=>{
        let venues=doc.data().venueArray;
         for(let i=0;i<venues.length;i++){
          database.collection('venues').doc(venues[i]).get().then((doc)=>{
      
                const image=doc.data().image;
                const name=doc.data().name;
                const docid=doc.id;

                const boxdiv=document.createElement('div');
                const eimage=document.createElement('img');
                const infodiv=document.createElement('div');
                const eventh=document.createElement('h3');
                const btna=document.createElement('a');

                eimage.setAttribute('src',image);
                eventh.innerHTML=name;
                btna.innerHTML='View';
                btna.setAttribute('class','btn');
                // btna.setAttribute('href','venueDetail.html');
                btna.setAttribute('onclick','Venuedetailid(this.id)');
                btna.setAttribute('id',docid);
                boxdiv.setAttribute('class','box');
                infodiv.setAttribute('class','info');
                infodiv.appendChild(eventh);
                infodiv.appendChild(btna);
                boxdiv.appendChild(eimage);
                boxdiv.appendChild(infodiv);

                venuebox.appendChild(boxdiv);
      
                
                // const boxdiv=document.createElement('div');
                // const infodiv=document.createElement('div');
                // const title=document.createElement('h3');
                // const btn=document.createElement('a');
                // const image=document.createElement('img');
      
                // boxdiv.setAttribute('class','box');
                // infodiv.setAttribute('class','info');
                // btn.setAttribute('class','venuebtn');
                // btn.setAttribute('id',id);
                // title.innerHTML=name;
                // btn.innerHTML='View';
                // image.setAttribute('src',img);
      
                
                // infodiv.appendChild(title);
                // infodiv.appendChild(btn);
      
                // if(i%2==0){
                //   boxdiv.appendChild(infodiv);
                //   boxdiv.appendChild(image);
                //   boxcontainer1.appendChild(boxdiv);
                // }
                // else{
                //   boxdiv.appendChild(image);
                //   boxdiv.appendChild(infodiv);
                //   boxcontainer2.appendChild(boxdiv);
      
                // }
      
          });
        }
  });

  


}


function authenticate(){
  // const user = firebase.auth().currentUser;
  // if(user){
  //   window.location.href='Booking.html';

  // }

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      var id=user.uid;
      console.log(user.displayName);
      database.collection('users').doc(id).get().then((doc)=>{
              if(doc.exists){
                window.location.href='Booking.html';
                sessionStorage.username=doc.data().name;
                sessionStorage.useraddress=doc.data().address;
                sessionStorage.usercontact=doc.data().contact;
                sessionStorage.userid=id;
              }
              else {
                console.log("User not present");
                username=user.displayName;
                userimage=user.photoURL;
                userid=user.uid;

                $('#signup').modal('toggle');
              }
              
      });
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage);
    });
  

}

function signup(){
  let form=document.getElementById('signup-form');
  const address=form.elements['address'].value;
  const number=form.elements['contact'].value;

  
  sessionStorage.username=username;
  sessionStorage.useraddress=address;
  sessionStorage.usercontact=number;
  sessionStorage.userid=userid;

  database.collection('users').doc(userid).set({
       name:username,
       image:userimage,
       address:address,
       contact:number,
       totalBookings:0,
       Bookings:new Array()

  })
  .then((
      
      // window.location.href='Booking.html'
      console.log("Success")
  ))
  .catch((error) => {
   console.log("Error writing document: ", error);
 });

  alert(username+" "+userimage+" "+address+" "+number);
}

function setmindate(){
    var dtToday = new Date();
    
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    var maxDate = year + '-' + month + '-' + day;
    console.log(maxDate);
    $('#startdate').attr('min', maxDate);
    $('#enddate').attr('min', maxDate);
}

function setminenddate(date){
  document.getElementById('booking-form').elements['enddate'].value=new Date();
  $('#enddate').attr('min', date);


}

function completebooking(){

  const user = firebase.auth().currentUser;
  if(!user){
    console.log("user doesn't logged in");

  }
  else{
    console.log(sessionStorage.providerName);

  let form=document.getElementById('booking-form');
  const stime=form.elements['starttime'].value;
  const etime=form.elements['endtime'].value;
  const sdate=form.elements['startdate'].value;
  const edate=form.elements['enddate'].value;
  const guests=form.elements['guests'].value;
  
//  var startdate = Date.parse(sdate);
 var startdate=new Date(sdate);
 console.log("start date is "+startdate);
 
 var enddate = new Date(edate);

  database.collection('bookings').add({
         startDate:startdate,
         endDate:enddate,
         startTime:stime,
         endTime:etime,
         peoples:guests,
         status:"pending",
         totalAmount:200,
         VP_contact:sessionStorage.providerContact,
         VP_name:sessionStorage.providerName,
         booker:sessionStorage.username,
         booker_address:sessionStorage.useraddress,
         booker_contact:sessionStorage.usercontact,
         venue_name:sessionStorage.venueName

  })
  .then((docref)=>{
      console.log(docref);
      database.collection('venues').doc(sessionStorage.venueid).update({
        bookings:firebase.firestore.FieldValue.arrayUnion(docref.id),
        totalBookings:firebase.firestore.FieldValue.increment(1)
      });
      database.collection('users').doc(sessionStorage.userid).update({
        bookings:firebase.firestore.FieldValue.arrayUnion(docref.id),
        totalBookings:firebase.firestore.FieldValue.increment(1)
      });
      window.location.href='index.html';
      alert("Booking Completed successfully!!");
  })
  .catch((error)=>{
    console.log(error);
  })


  }

  
}
