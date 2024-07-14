const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
        console.error(error);
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0, //no cached data
    }
);
}

 //initialize map  centerd at 0,0 and zppm level 17 using leaflet 
 const map = L.map("map").setView([0, 0], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Apil map"
}).addTo(map)

//create a empty object

const  markers = {};

// receive data from socket - and loacte own location in center 
socket.on("receive-location", (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude], 17);

    if(markers[id]){
    markers[id].setLatLng([latitude, longitude]);

    }else{
        markers[id]= L.marker([latitude, longitude]).addTo(map);
    }
})  
//17-zoom 

//remove marker when disconnect
socket.on("user-disconnected", (id) => {
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]
    }
 })

