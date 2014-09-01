$(document).ready(function(){
	$("#sResults").hide();
	$("#detail").hide();
	Parse.initialize("TcBoKoJoO6aVZyuTxqrEp53LeKM375rNaO0nEKsU", "QIzsOamTCievUP6bjhCO8vQ8dG65kL1HoqEBnsCy");
	
	var coin = Parse.Object.extend("Coin");
	var query = new Parse.Query(coin);	
	
	query.find({
		success: function(results){
			var s="";
			for(var i=0; i<results.length; i++){
				var coine = results[i];
				var image = coine.get("image");
				s+=displayCoinMaster(coine.get("country"), image.url(), coine.id);
			}
			$("#catalog").html(s);
		},
		error: function(error){
			alert("Error en recuperación");
		}
	});
});

function displayCoinMaster(country, imgURL, id) {
	var panel="<div class='col-sm-3'>" +
					   "<div class='panel panel-default'> \n" +
					   "<div class='panel-heading'> \n" +
					   "<a onclick=\" displayDetail(\'"+id+"\') \"> <h2 class='panel-title'>"+country+"</h2> </a>\n" +
					   "</div> <div class='panel-body'> \n" +
					   "<img src='"+imgURL+"'/>\n" +
					   "</div> \n </div> \n </div> \n";
	return panel;
}

function displayCoinDetail(country, period, imgURL, description) {
	$("#dlCountry").html(country);
	$("#dlDescription").html(description);
	$("#dlPeriod").html(period);
	$("#dImage").attr("src", imgURL);
}

function tag(id) {
	var coin= Parse.Object.extend("Coin");
	var queryCoin = new Parse.Query(coin);
	
	queryCoin.get(id, {
		success: function(coine) {
			var tag = Parse.Object.extend("Tag");
			var queryTag = new Parse.Query(tag);
			
			queryTag.equalTo("relation", coine);
			queryTag.find({
				success: function(tags) {
					var s = "";
					for(var i=0; i<tags.length; i++){
						s+=displayTag(tags[i].get("description"));
					}
					$("#dlTags").html(s);
					
					$("#sResults").hide();
					$("#catalog").hide();
					$("#detail").show();
				},
				error: function(error) {
					alert("Error en recuperación");
				}
			});
		},
		error: function(error) {
			alert("Error en recuperación");
		}
	});
}

function displayTag(description) {
	return "<li class='dStyle'> <strong>"+description+"</strong> </li>";
}

function search() {
	var description = $("#sCriteria").val().toLowerCase();
	//alert(description);
	var tag = Parse.Object.extend("Tag");
	var query = new Parse.Query(tag);
	query.equalTo("description", description);
	
	query.find({
		success: function(tags){
			if(tags.length > 0) {
				var tage = tags[0];
				var relation = tage.relation("relation");
				relation.query().find({
					success: function(list){
						var s = "<div class='col-sm-1 col-sm-offset-11'>" +
									"<button type='button' onClick='displayAll()' class='btn btn-xs btn-success'>" +
									"<span class='glyphicon glyphicon-remove'></span></button> </div>";							
						for(var j=0; j<list.length; j++){
							var coine = list[j];
							image = coine.get("image");
							s+=displayCoinMaster(coine.get("country"), image.url(), coine.id);
						}
						$("#sResults").html(s);
					},
					error: function(error){
						alert("Error en relación");
					}
				});
				$("#detail").hide();
				$("#catalog").hide();
				$("#sResults").show();
			}
			else {
				alert("No hubo coinicidencias");
			}
		},
		error: function(error){
			alert("Error en recuperación");
		}
	});
}

function displayAll(){
	$("#sResults").hide();
	$("#detail").hide();
	$("#catalog").show();
}

function displayDetail(id){
	var coin = Parse.Object.extend("Coin");
	var query = new Parse.Query(coin);

	query.get(id, {
		success: function(coine) {
			var image = coine.get("image");
			displayCoinDetail(coine.get("country"), coine.get("period"), image.url(), coine.get("description"));
			tag(id);
		},
		error: function(error) {
			alert("Error en recuperación");
		}
	});
}