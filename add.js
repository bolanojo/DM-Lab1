$(document).ready(function(){
	Parse.initialize("TcBoKoJoO6aVZyuTxqrEp53LeKM375rNaO0nEKsU", "QIzsOamTCievUP6bjhCO8vQ8dG65kL1HoqEBnsCy");
});

function test() {
	var txtArea = document.getElementById("txtTags");
	var txtContent = txtArea.value.split('\n');
	
	for(var i=0; i<txtContent.length; i++) {
		var description = txtContent[i];
		
		var tag = Parse.Object.extend("Tag");
		var query = new Parse.Query(tag);
		query.equalTo("description", description);
		query.find({
			success: function(tags){
				if(tags[0] != null){
					addTag(description);
				}
			},
			error: function(error){
				alert("Error en recuperación");
			}
		});
		
	}
	
}

function getTag(description) {
	var result = null;
	var tag = Parse.Object.extend("Tag");
	var query = new Parse.Query(tag);
	
	query.find({
		success: function(results) {
			for(var i=0; i<results.length; i++) {
				var tage = results[i];
				if(tage.get("description").match(description)){
					alert(tage.get("description"))
					return tage;
					break;
				}
			}
		},
		error: function(error){
			return null;
		}
	});
	
}

function addTag(description) {
	var tag = Parse.Object.extend("Tag");
	var tage = new tag();
	tage.set("description", description);
	
	tage.save(null, {
		success: function(tage){
			alert("Éxito en creación tag obId "+tage.id+" desc "+description);
			return tage;
		},
		error: function(tage, error){
			alert("Error en creación");
			return null;
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
					alert("Nuevo registro creado exitosamente obId "+coine.id);
					
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