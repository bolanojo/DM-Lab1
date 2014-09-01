$(document).ready(function(){
	Parse.initialize("TcBoKoJoO6aVZyuTxqrEp53LeKM375rNaO0nEKsU", "QIzsOamTCievUP6bjhCO8vQ8dG65kL1HoqEBnsCy");
});

function assignTags(coine) {
	var txtArea = document.getElementById("txtTags");
	var txtContent = txtArea.value.split('\n');
	
	for(var i=0; i<txtContent.length; i++) {
		searchTag(coine, txtContent[i].toLowerCase());
	}
	
	txtArea.value = "";
}

function searchTag(coine, description) {
	var tag = Parse.Object.extend("Tag");
	var query = new Parse.Query(tag);
	
	query.equalTo("description", description);
	//alert(description);
	query.find({
		success: function(tags){
			if(tags.length > 0) {
				addRelation(coine, tags[0]);
			}
			else {
				addTag(coine, description);
			}
		},
		error: function(error){
			alert("Error en recuperación");
		}
	});
}

function addRelation(coine, tage) {
	var relation = tage.relation("relation");
	relation.add(coine);
	tage.save();
}

function addTag(coine, description) {
	var tag = Parse.Object.extend("Tag");
	var tage = new tag();
	tage.set("description", description);
	
	tage.save(null, {
		success: function(tage){
			//alert("Éxito en creación tag obId "+tage.id+" desc "+description);
			addRelation(coine, tage);
		},
		error: function(tage, error){
			alert("Error en creación");
		}
	});
}

function addCoin() {
		var iCountry = document.getElementById("iCountry");
		var country = iCountry.value;
		
		var iPeriod = document.getElementById("iPeriod");
		var period = iPeriod.value;
		
		var iDescription = document.getElementById("iDescription");
		var description = iDescription.value;
		
		//alert(country+" "+period+" "+description);
		
		var iPhoto = document.getElementById("iPhoto");
		
		if (iPhoto.value != "" && country != "" && period != "" && description != "") {
		
			var parseFile;
		
			if(iPhoto.files.length > 0){
				var file = iPhoto.files[0];
				
				parseFile = new Parse.File(country+".jpg", file);
			}
			
			parseFile.save().then(function() {
				//alert("Image uploaded succesfully");
				}, function(error) {
					alert("Error al cargar la imagen");
			});
		
			var coin = Parse.Object.extend("Coin");
			var coine = new coin();
			
			coine.set("country", country);
			coine.set("period", period);
			coine.set("description", description);
			coine.set("image", parseFile);
			
			coine.save(null, {
				success: function(coine) {
					assignTags(coine);
					
				},
				error: function(coine, error){
					alert("Error al crear el registro");
				}
			});
			
			iCountry.value = "";
			iPeriod.value = "";
			iDescription.value = "";
			iPhoto.value = "";
		}
		else{
			alert("Falta información");
		}
	}