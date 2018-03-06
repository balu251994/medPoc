var me = this;
var diseaseArr = [];
var medicineArr = [];

var latitude;
var longitude;

document.addEventListener("backbutton", onBackKeyDown, false);  
function onBackKeyDown(e) { 
   e.preventDefault(); 
   alert('Back Button is Pressed!'); 
}

$(document).ready(function(){

// jQuery AJAX ( Network call to load file containing list of medicine corressponding to disease)
$.ajax({
    method:"get",
    url:"./data/medicine.json",
    dataType:"json",
    success:function(data,status){
        me.medicineArr = data;
    },
    error:function(error){
        console.log("File Not Loaded : " + error);
    }
});

$.ajax({
    method:"get",
    url:"./data/diseases.json",
    dataType:"json",
    success:function(data,status){
        me.diseaseArr = data.diseases;
    },
    error:function(error){
        console.log("File Not Loaded : " + error);
    }
});

});

// Method to search for the medicine from the list saved

function searchMed(set){
    // Fetch disease name from input field
    // change disease text to uppercase letters
    var disElement = {};
    var flag = false;
    var diseaseText;
    if(set != null){
        if(set === "Afever"){
            diseaseText = "Adult Fever";
        }else{
            diseaseText = "Child Fever";
        }
        
        disElement.key = set;
        flag = true;
    }else{
        diseaseText = document.getElementById("srchInp").value.toUpperCase();
    }

    if(diseaseText === 'FEVER'){
        $('#confirmAge').modal('toggle');
    }else{
        //check if disease name exists in data
    var diseases = diseaseArr;
       
        if(!flag){
            for(var i = 0 ; i < diseases.length ; i++){
            if(diseases[i].name === diseaseText){
                disElement = diseases[i];
                flag = true;
                break;
            }
            } 
        }

        if(flag){
            $('#mainPage').slideUp('slow');
            document.getElementById("diseaseHeading").innerHTML = diseaseText;
            var medList = medicineArr[disElement.key];
            //dynamically create list of medicine for given disease
            $('#medicineList').empty();
            for(var i=0; i <medList.length; i++){
                $('#medicineList').append("<li>" + medList[i] + "</li>");
            }

            if(disElement.key === "flu" || disElement.key === "highBS" || disElement.key === "highBP"){
                $('#mapBtn').hide();
                $('#docBtn').show();
            }
        
            $('#medPage').show('slow');
            $('#mainPage').hide();
        }else{
          $('#dataNotFoundDialog').modal('toggle');
        }
    }
}

function pressBack (){
         $('#medPage').slideDown("slow");
         $('#mainPage').show('slow');
         $('#medPage').hide();
         document.getElementById("srchInp").innerHTML.value = "";
         $('#mapBtn').show();
         $('#docBtn').hide();
}

function meetDoc(){
    openMap("medPage");
}

function openMap(evt){
    
    var searchText;

    if(evt === "mainPage"){
        searchText = "physicians";
    }else{
        searchText = "pharmacies";
    }
     var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(me.onSuccess, me.onError, options);

    var mapLoc = "https://www.google.com/maps/search/" + searchText + "/@" + longitude + "," + latitude + "," + "16z";
    window.open(mapLoc,"_blank");
}

function onSuccess (position) {
     latitude =  position.coords.latitude;
     longitude = position.coords.longitude;
    };

function onError (error){
        console.log(error);
    }

$(function(){
$("#ageYes").click(function(e){
    searchMed("Afever");
});

$("#ageNo").click(function(e){
    searchMed("Cfever");
});

$('#findDocs').click(function(e){
    openMap("mainPage");
});
});



