$(document).ready(function(){
	Parse.initialize("TcBoKoJoO6aVZyuTxqrEp53LeKM375rNaO0nEKsU", "QIzsOamTCievUP6bjhCO8vQ8dG65kL1HoqEBnsCy");
	
	var coin = Parse.Object.extend("Coin");
	var query = new Parse.Query(coin);
	
	
	query.find({
		success: function(results){
			var s="";
			for(var i=0; i<results.length; i++){
				var coine = results[i];
				var image = coine.get("image");
				
				 s+="<div class='col-sm-3'>" +
					   "<div class='panel panel-default'> \n" +
					   "<div class='panel-heading'> \n" +
					   "<h2 class='panel-title'>"+coine.get("country")+" ("+coine.get("period")+")</h2> \n" +
					   "</div> <div class='panel-body'> \n" +
					   "<img src='"+image.url()+"'/>\n" +
					   "<p id='pDescription'>"+coine.get("description")+"</p>\n" +
					   "<small> <em> <p id='tags"+coine.id+"'>Etiquetas: </p> </em> </small>\n" +
					   "</div> \n </div> \n </div> \n";
					   
			}
			$("#catalog").html(s);
		},
		error: function(error){
			alert("Error en recuperación");
		}
	});
	
	tag();
});

function tag(){
	var tag = Parse.Object.extend("Tag");
	var query = new Parse.Query(tag);
	query.find({
		success: function(results) {
			
			for(var i=0; i<results.length; i++){
				var tage = results[i];
				var relation = tage.relation("relation");
				relation.query().find({
					success: function(list){
						for(var j=0; j<list.length; j++){
							var coin = list[j];
							var id = "tags";
							id+=coin.id;
							var tagd = document.getElementById(id);
							var tags = tagd.innerHTML;
							tags+= tage.get("description")+"  ";
							tagd.innerHTML = tags;
						}
					},
					error: function(error){
						alert("Error en relación");
					}
				});
			}	
		},
		error: function(object, error){
			alert("Error en recuperación");
		}
	});
}