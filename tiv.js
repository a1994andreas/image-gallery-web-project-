/*globals $:false */
/*globals EXIF:false */
/*globals google:false */
/*globals escape:false */

 function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

        document.cookie = "num_of_photos=10";;

var noumero1;
var all_meta_data;
var TIV3031 = function (loaded_images_server){
	
	var imagesurls ={
		LoadedImages: [],
                loaded_images_server2: loaded_images_server
	};
	var current_image;
	var current_image_id;
	var error_flag =0;
	var images_on_screen=0;
	var append_map_flag=0;
	return {
		
		loadImages: function(){
			var files = document.getElementById("images_name").files;
			for (var i = 0; i < files.length; i++) {
				if(files[i].type.indexOf("image") != -1)
					imagesurls.LoadedImages.push(files[i]);
			}
			 
		},
		
		
		
		
		getLoadedImagesURLs: function(){
			return imagesurls.LoadedImages;
		},
		
		
		
		
		showLoadedImages: function( elem){
			//error check 
			if(imagesurls.LoadedImages.length===0){
				$(elem).append("<br><br><h1><p id=\"error_message\">Error message:O fakelos den exei eikones!!</p></h1>");
				error_flag=1;
			}else{ 
				if(error_flag==1){
					console.log("error flag up");
					document.getElementById("error_message").innerHTML = "";
					error_flag=0;
				}
			}
      function aaa(file, i) {
					return function(e ) {
						//console.log(file.name);
                                                
	//					$(elem).append(" <div class=\"TIV \"><figure><img src=\" "+imagesurls.loaded_images_server2[1+"\" id=\"image"+(images_on_screen+i+1)+"\" onclick=\"image_zoom("+(images_on_screen+i+1)+"); \" alt=\"error loading image\" title=\""+ escape(file.name)+"\" /><figcaption></figcaption></figure></div>");
						
					};
				}
			for(var i=images_on_screen; i< imagesurls.LoadedImages.length ; i++ ){
				var file = imagesurls.LoadedImages[i];
                                
                                 
    
                                
				// Have to check that this is an image though
				// using the file.name TODO
				//var reader = new FileReader();
				// Closure to capture the file information.
				//reader.onload = aaa(file, i);
				// Read in the image file as a data URL.
				//reader.readAsDataURL(file);
			}
			images_on_screen+=i;
		},




		showImage: function(index , elem){
			console.log("enter image_zoom");
			//creating here everything you are about to use 
			$(elem).addClass("modal");
			$(elem).append("<span class=\"close\"  onclick=\"image_close();\">X</span>");
		
			
			current_image_id =index;
			current_image ="#"+"image"+index ; 
			document.getElementsByClassName("close")[0].style.display = "block";
			$(current_image).addClass("zoom_image");
			document.getElementsByClassName("modal")[0].style.display = "block";			
		},


		

		image_close: function(){
			console.log("image_close()");
			$(current_image).removeClass("zoom_image");
			document.getElementsByClassName("close")[0].style.display = "none";
			document.getElementsByClassName("modal")[0].style.display = "none";
			$("#allMetaDataSpan").removeClass("metaData");
			document.getElementsByClassName("map_container")[0].style.display= "none";
			document.getElementsByClassName("map_container")[0].style.width= "0px";
			document.getElementsByClassName("map_container")[0].style.height= "0px";
			}, 
		
		
		
		
		
		
		showImageDetailedExifInfo: function(index, elem){
			var selectedimage = document.getElementById("image"+index);	
			EXIF.getData(selectedimage, function() {
				var allMetaData = EXIF.getAllTags(this);
				var allMetaDataSpan = document.getElementById(elem);
				allMetaDataSpan.style.display = "block";
				allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null,"\n");
			});
			$("#allMetaDataSpan").addClass("metaData");
		}, 
		
		
		
		
		
		showImageDetailedExifWithMap: function(index, elem){
			if(append_map_flag===0){
				$(elem).append("<div class=\"map_container\"><div class=\"map\" id=\"map\"> </div> </div>");
				append_map_flag=1;
			}
                       
			  var gpsloc2 = EXIF.getData(document.getElementById("image"+index), function() {	
                            window.noumero1 = EXIF.getTag(this,'GPSLatitude');
                            console.log(EXIF.getTag(this,'GPSLatitude') , window.noumero1);
                            return EXIF.getTag(this,'GPSLatitude');
                            });     
				document.getElementsByClassName("map_container")[0].style.display= "block";
				document.getElementsByClassName("map_container")[0].style.width= "100%";
				document.getElementsByClassName("map_container")[0].style.height= "200px";
				//heraklion coordinates
				//var uluru  ={lat: 35.3386, lng: 25.1442 };
                                
                                                            var gpsloc = window.noumero1;

                               // console.log(gpsloc,"\ngpsloc2: ",gpsloc2);
                                var uluru;
                                if(gpsloc !== undefined && gpsloc2===true){
                                    uluru ={lat: gpsloc[0].numerator, lng: gpsloc[1].numerator };
                             //       console.log(uluru);
                                }
                                else {
                                    //heraklion coords
                                   uluru  ={lat: 35.3386, lng: 25.1442 }; 
                                    
                                }
                    
                                //init map	
				var map = new google.maps.Map(document.getElementById("map"), {
					center: uluru,
					scrollwheel: false,
     				size: new google.maps.Size(71, 71),
					draggable:true,
					zoom: 8
				});
				var marker = new google.maps.Marker({
					position: uluru,
				});
				marker.setMap(map);
			
			
			$("#map").show();	

			}
	};
	
}; 	

var dokimh = new TIV3031();


function readAndShowFiles(){
	dokimh.loadImages();
	dokimh.showLoadedImages("#title");
}
	 

var imagez = new TIV3031();

function image_zoom(id){
	imagez.showImage(id, "#container");
	//imagez.showImageDetailedExifInfo(id , "allMetaDataSpan");
	imagez.showImageDetailedExifWithMap(id , "body");	
}
      
function image_close(){
	imagez.image_close();
}

var images_on_screen=0;

function get_image_collection (givven_username){
 var current_username =getCookie("username");
 console.log(current_username);
 var type_of_user;
 if(current_username ===undefined )     
     type_of_user=0;
 
else
     type_of_user=1;
 
 if(givven_username!== undefined ){
     
     current_username= givven_username;
 }
 
 
 
 console.log("type of user: ",type_of_user);
 var num_of_photos =document.getElementById("num_of_photos");
 var number;
    if(num_of_photos ===null){
        number=getCookie("num_of_photos");
        
        //document.cookie = "num_of_photos="+number;

    }else
    {

        number=$("#num_of_photos").val();
        document.cookie = "num_of_photos="+number;

    }
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'GetImageCollection?userName='+current_username+'&num_of_photos='+number+'&type_of_user='+type_of_user);
            xhr.onload = function () {
            if (xhr.status === 200) {
                var photo_ids= JSON.parse(xhr.responseText);
                for(var i=0; i<photo_ids.length ;i++){
                    if(givven_username!== undefined ){
                         get_image(photo_ids[i], 1);

                    }else {
     
                         get_image(photo_ids[i]);

                    }
                    console.log(photo_ids[i]);
                }
                images_on_screen=0;
                document.getElementById('container').innerHTML="";
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
            
            
}

function get_image(id ,onclick_off){
     var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'GetImage?photo_id='+id+'&metadata=false');
            xhr.responseType = "blob";
            
            xhr.onload = function () {
            if (xhr.status === 200) {
                 var blob = new Blob([this.response], {type: 'image/png'});;
                 var div = document.createElement("div");
                 div.id = "div_photo"+id;
                 var div_data = document.createElement("div");
                   var current_username =getCookie("username");
                var type_of_user;
                if(current_username ===undefined )    { 
                    if(onclick_off !== undefined){
                         div.innerHTML = "<img src='"+window.URL.createObjectURL(blob)+"'  id='image"+(id)+"'  />";

                    }else{
                        div.innerHTML = "<img src='"+window.URL.createObjectURL(blob)+"'  id='image"+(id)+"' onClick='new_show_image("+id+")' />";
                    }
                }else{
                    if(onclick_off !==undefined){
                         div.innerHTML = "<img src='"+window.URL.createObjectURL(blob)+"'  id='image"+(id)+"'  />"  ;

                    }else{
            div.innerHTML = "<img src='"+window.URL.createObjectURL(blob)+"'  id='image"+(id)+"' onClick='new_show_image("+id+")' />" +"<input style='width:50px;height:30px;float:left;' type='button' value='Delete' class=\"btn btn-primary\" onClick='delete_image("+id+")'>" ;
                    }
                        
                        }              //div.setAttribute("id","all_images");
                    document.getElementById('container').appendChild(div);
                    document.getElementById('image'+id).onmouseover = function (){
                        
                        
                                     var xhr;
                               xhr = new XMLHttpRequest();
                               xhr.open('GET', 'ReturnRatingAverage?photo_id='+id);
                             
                               xhr.onload = function () {
                               if (xhr.status === 200) {
                                                            var rating_array= JSON.parse(xhr.responseText);
                               var average = rating_array[0];
                                   var total = rating_array[1];
                           var user_rating = rating_array[2];
                           var title_text = "Average rating: "+average+"\ntotal ratings: "+total;
                                   document.getElementById("image"+id).title =title_text;
                               } else if (xhr.status !== 200) {
                                   alert('Request failed. Returned status of ' + xhr.status);
                               }
                               };
                               xhr.send();
                    }
                 
                 images_on_screen++;
            //   document.getElementById("myImage").src = window.URL.createObjectURL(blob);
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
}

function get_meta_data(id){
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'GetImage?photo_id='+id+'&metadata=true');
           
            
            xhr.onload = function () {
            if (xhr.status === 200) {
//               /   var all_meta_data= JSON.parse(xhr.responseText);
                  console.log(xhr.responseText);
                  var endiamesos = xhr.responseText.replace("," , "<br>ContentType: ").replace("," , "<br>Title: ").replace("," , "<br>Date: ").replace("," , "<br>");
                  var endiamesos2 = endiamesos.replace("[","User: ").replace("]", " ");
                 
                
                    
                    EXIF.getData(document.getElementById("image"+id), function() {	
                        //    console.log(EXIF.pretty(this));
                            window.all_meta_data =EXIF.pretty(this);
                            return EXIF.getTag(this,' ');
                            });     
                    
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    //edw 8eloume mia replace all na  kanei ta \n <br>
                  window.all_meta_data =  window.all_meta_data.replace(/(?:\r\n|\r|\n)/g, '<br />');

                 //   window.all_meta_data =window.all_meta_data.replace("\n","<br>");
                   
                    document.getElementById("meta_data_text").innerHTML="/*click on the image to refresh the map location*/<br><h3>Data from database:</h3>"+endiamesos2+"<h3>Meta data info:</h3>"+window.all_meta_data;
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
  
        imagez.showImageDetailedExifWithMap(id,"body");
}


function upload_selected_image() {
    var file = document.getElementById("images_name").files[0];
    console.log(file);

    //exif data before upload
    /*  var title = EXIF.getData(file, function() {	
        console.log(EXIF.pretty(this));				
        return EXIF.getTag(this, "")
});*/
    
    var contentType = file.type;
    var title = file.name;
    
    console.log(contentType, name);
    var formData = new FormData();
    var reader = new FileReader();
    reader.onload = function () {
        xhr = new XMLHttpRequest();
        formData.append('file', file);
        var current_username = getCookie("username");
        xhr.open('POST', 'UploadImage?userName=' + current_username + '&contentType='+contentType+'&title='+title);
        xhr.send(formData);
    }
    reader.readAsDataURL(file);

}
var current_opened_image=0;
function new_show_image(index ){
    
                    get_meta_data(index);
                    var elem = document.getElementById("image"+index);
                     $("#modal_content").addClass("modal");
			$("#modal_content").append("<span class=\"close\" id=\"close\" onclick=\"new_close_image();\">X</span>");
		
			current_opened_image=index;
			$("#close").css("display","block");
			//document.getElementsByClassName("close")[0].style.display = "block";
			$(elem).addClass("zoom_image");
                     //   $("#modal").css("display","block");
			document.getElementsByClassName("modal")[0].style.display = "block";
                     elem.style.zIndex = "6000" ;
			document.getElementsByClassName("modal")[0].style.zIndex = "2000";
            
            //for meta data info
            document.getElementById("meta_data_text").style.zIndex="6000";
            document.getElementById("meta_data_text").style.display="block";
           
            var div = document.createElement("div");
                        div.id="resize"+index;
                        div.innerHTML=
                        "<input id='photo_height' type='number' name='photo_height' class=\"form-control\" min=\"1\" style='width:10%;float:left;'></input>"+ //fotis  
                        "<input id='photo_width' type='number' name='photo_width' class=\"form-control\" min=\"1\" style='width:10%;float:left;'></input>"+
                        "<input type='button' value='Resize'  class=\"btn btn-primary\" onclick=\"resize("+index+");\" style='width:10%;float:left;'></input>";
                        document.getElementById("modal_content").appendChild(div);
                        
                         var check_logged_in =getCookie("username");
                            if(check_logged_in !== undefined){
                                var div22 = document.createElement("div");
                        div22.id="comments_info"+index;
                        div22.innerHTML=
                        "<br><br><br><br>Photo comments : <input id='comment_readonly' type='text'  class=\"form-control\" min=\"1\" style='width:30%;height:100px;' value='Comments : ' readonly></input>"+ //fotis 
                        document.getElementById("modal_content").appendChild(div22);
                                
var div2 = document.createElement("div");
                        div2.id="comment"+index;
                        div2.innerHTML=
                        "<br><br><input id='comments' type='text' name='photo_height' class=\"form-control\" min=\"1\" style='width:30%;height:100px;'></input>"+ //fotis 
                        "<input type='button' value='Add comment'  class=\"btn btn-primary\" onclick=\"comment();\" style=''></input>";
                        document.getElementById("modal_content").appendChild(div2);
                        
                        
                        var div3 = document.createElement("div");
                        div3.id="rate"+index;
                        div3.innerHTML=
                        "<br><br><br><input type='number' id='rating' min='1' max='5'></input>"+
                        "<input type='button' value='Rate this photo'  class=\"btn btn-primary\" onclick=\"rate();\" style=''></input>";
                        document.getElementById("modal_content").appendChild(div3);

                            }
all_comments();
}
function new_close_image(){
    
document.getElementById("modal_content").removeChild(document.getElementById("resize"+current_opened_image));
var elem = document.getElementById("image"+current_opened_image);
      $("#modal_content").removeClass("modal");
      $(elem).removeClass("zoom_image");
       elem.style.zIndex = "0" ;
       document.getElementsByClassName("close")[0].style.display = "none";
       
       document.getElementById("meta_data_text").style.display="none";
       $("#allMetaDataSpan").removeClass("metaData");
			document.getElementsByClassName("map_container")[0].style.display= "none";
			document.getElementsByClassName("map_container")[0].style.width= "0px";
			document.getElementsByClassName("map_container")[0].style.height= "0px";
        var check_logged_in =getCookie("username");
                 if(check_logged_in !== undefined){
                document.getElementById("modal_content").removeChild(document.getElementById("comment"+current_opened_image));
                   document.getElementById("modal_content").removeChild(document.getElementById("rate"+current_opened_image));
                   document.getElementById("modal_content").removeChild(document.getElementById("comments_info"+current_opened_image));
                 }

}


function delete_acc(){
        
    var xhr;
            xhr = new XMLHttpRequest();
            var username = getCookie("username");
            xhr.open('GET', 'DeleteAccount?username='+username);
            xhr.onload = function () {
            if (xhr.status === 200) {
                window.location = "http://localhost:8084/WebApplication1/index.jsp";
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
}

function delete_all_images_of_user(){
    var current_username =getCookie("username");
 console.log(current_username);
 var type_of_user;
 if(current_username ===undefined )     
     type_of_user=0;
 
else
     type_of_user=1;
 console.log("type of user: ",type_of_user);
 var num_of_photos =document.getElementById("num_of_photos");
 var number;
    if(num_of_photos ===null){
        number=10;
        
        
    }else
    {
        number=$("#num_of_photos").val();
        
    }
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'GetImageCollection?userName='+current_username+'&num_of_photos='+number+'&type_of_user='+type_of_user);
            xhr.onload = function () {
            if (xhr.status === 200) {
                var photo_ids= JSON.parse(xhr.responseText);
                for(var i=0; i<photo_ids.length ;i++){
                    delete_image(photo_ids[i]);
                    console.log(photo_ids[i]);
                }
                images_on_screen=0;
                document.getElementById('container').innerHTML="";
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
    
    
    
    
}

function delete_image(photo_id){
    
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'DeleteImage?photo_id='+photo_id);
            xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('image deleted from the server');
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
}

function resize(current_id){
    var width = document.getElementById("photo_width").value;
    var height= document.getElementById("photo_height").value;
    console.log(width,height);
   var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'ResizeImage?id='+current_id+"&width="+width+"&height="+height);
             xhr.responseType = "blob";

            
            xhr.onload = function () {
            if (xhr.status === 200) {
                
                document.getElementById("container").removeChild(document.getElementById("div_photo"+current_id));
  var blob = new Blob([this.response], {type: 'image/png'});;
                 var div = document.createElement("div");
                 div.id = "div_photo"+current_id;
                
                
                         div.innerHTML = div.innerHTML = "<img src='"+window.URL.createObjectURL(blob)+"'  id='image"+(current_id)+"' onClick='new_show_image("+current_id+")' />";
                    document.getElementById('container').appendChild(div);
                    document.getElementById('image'+current_id).style.width =width;
                    document.getElementById('image'+current_id).style.height =height;
                    new_close_image();
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();

 
}

function rate(){
    
    var rating = document.getElementById("rating").value;
    var username =  getCookie("username");
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'Rate?photo_id='+current_opened_image+'&rate='+rating+'&username='+username);
            xhr.onload = function () {
            if (xhr.status === 200) {
               alert("Your rate has successfully added on the database");
            }
            else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
}

function comment(){
    var comment = document.getElementById("comments").value;
    var username =  getCookie("username");
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'AddComment?comment='+comment+'&username='+username+'&photo_id='+current_opened_image);
            xhr.onload = function () {
            if (xhr.status === 200) {
               alert("Your comment  has successfully added on the database");
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
}


function all_comments(){
    
     var comment = document.getElementById("comments").value;
    var username =  getCookie("username");
    var xhr;
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'AllComments?photo_id='+current_opened_image);
            xhr.onload = function () {
            if (xhr.status === 200) {
             
               document.getElementById("comment_readonly").value = xhr.responseText;
            } else if (xhr.status !== 200) {
                alert('Request failed. Returned status of ' + xhr.status);
            }
            };
            xhr.send();
    
    
}