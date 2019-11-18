var markers = {};
var mtx;
var respo;

var priorityIndex = {
  noc: {
    p: 10000,
    d: 40
  },

  fu: {
    p: 5000,
    d: 20
  },

  ri: {
    p: 1,
    d: 100
  }
};

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(24.4539, 54.3773),
    zoom: 15
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  function addmarker(latilongi, name, type) {
    var marker = new google.maps.Marker({
      position: latilongi,
      title: name,
      draggable: true,
      map: map,
      label: {
        text: name,
        color: "#ffff",
        fontWeight: "bold"
      }
    });
    marker.priorityIndex = type;
    map.setCenter(marker.getPosition());
    markers = Object.assign(markers, { [name]: marker });
  }

  $("#markerButton").on("click", function() {
    let name = prompt("enter name");
    let type = prompt("enter type ('noc', 'fu', 'ri')");
    console.log(name);
    if (name === null) return;
    addmarker(
      new google.maps.LatLng(24.4539, 54.3773),
      name,
      priorityIndex[type]
    );
  });

  const genDistanceMatrix = () => {
    let out = [];
    let keys = Object.keys(markers);
    $("#distMtx").empty();
    for (let i = 0; i < keys.length; i++) {
      $("#distMtx").append("<tr>");
      out.push(new Array());
      for (let j = 0; j < keys.length; j++) {
        out[i].push(
          (google.maps.geometry.spherical.computeDistanceBetween(
            markers[keys[i]].getPosition(),
            markers[keys[j]].getPosition()
          ) /
            603 +
            markers[keys[j]].priorityIndex.d) /
            markers[keys[j]].priorityIndex.p
        );
        $("#distMtx").append(`<td>${out[i][j]}</td>`);
      }
      $("#distMtx").append("</tr>");
    }
    mtx = out;
  };

  $("#shortestButton").click(e => {
    let body = {};
    mtx.forEach((item, index) => {
      body = Object.assign(body, { [index]: item });
    });

    $.post("http://localhost:3000/", body, res => {
      respo = JSON.parse(res);
      console.log(respo);
      let keys = Object.keys(markers);
      markers["12356127821"]
      keys.forEach(key => {
        markers[key].label = "kk";
        
      })

    });

  });

  $("#matrixButton").click(e => {
    genDistanceMatrix();
  });

  $("#connectButton").click(e => {
    let keys = Object.keys(markers);
    let pathCoord = [];
    keys.forEach(item => {
      pathCoord.push(markers[item].getPosition());
    });

    let connectPath = new google.maps.Polyline({
      path: pathCoord,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    connectPath.setMap(map);
  });

  $("#loadButton").click(e => {
    let data = [
      [24.4955744135447, 54.4076259543033,  "12356127814", "fu"],
      [24.4913299253202, 54.3798049523895, "12356127815", "fu"],
      [24.4903461818497, 54.3848938188889, "12356127816", "fu"],
      [24.5053242050925, 54.4111964550844, "12356127817", "fu"],
      [24.3872547971895, 54.7229416678725, "12356127818", "fu"],
      [24.3872547971895, 54.7229416678725, "12356127819", "fu"],
      [24.2983740766562, 54.6267177864179, "12356127820", "fu"],
      [24.495360067228, 54.3825800783365, "12356127821", "fu"]
    ];
    console.log("clicked");
    data.forEach(row => {
      console.log("foo");
      addmarker(
        new google.maps.LatLng(row[0], row[1]),
        row[2],
        priorityIndex[row[3]]
      );
    });
  });
}
