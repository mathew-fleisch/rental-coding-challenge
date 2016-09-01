jQuery(document).ready(function($) { 
	//console.log(raw_data);

	if(raw_data) { 
		var track           = 0;
		var avg_byBedBath    = [];
		var square_footage   = [];
		var avg_bySquareFoot = [];
		for(var rental in raw_data) { 
			track++;
			// console.log(track+": "+parseInt(raw_data[rental]['price']));
			var crnt_price      = parseInt(raw_data[rental]['price']);
			var crnt_bedrooms   = parseInt(raw_data[rental]['bedrooms']);
			var crnt_bathrooms  = parseInt(raw_data[rental]['bathrooms']);
			var crnt_sqfootage  = parseInt(raw_data[rental]['square-foot']);
			

			//Aggregate prices based on the number of bedrooms and bathrooms together
			if(!avg_byBedBath[crnt_bedrooms]) { avg_byBedBath[crnt_bedrooms] = []; }
			if(!avg_byBedBath[crnt_bedrooms][crnt_bathrooms]) { avg_byBedBath[crnt_bedrooms][crnt_bathrooms] = []; }
			avg_byBedBath[crnt_bedrooms][crnt_bathrooms].push(crnt_price);


			if(!square_footage[crnt_bedrooms]) { square_footage[crnt_bedrooms] = []; }
			if(!square_footage[crnt_bedrooms][crnt_bathrooms]) { square_footage[crnt_bedrooms][crnt_bathrooms] = []; }
			square_footage[crnt_bedrooms][crnt_bathrooms].push(crnt_sqfootage);
		}


		console.log("Totals for Bedroom/Bathrooms: ",avg_byBedBath);
		$("#container").append('<div class="avg_by_bedroom_bathroom">'
				+'<table class="table table-hover table-striped">'
					+'<thead>'
						+'<th>Number of Bedrooms</th>'
						+'<th>Number of Bathrooms</th>'
						+'<th>Average Price</th>'
						+'<th>Price Range</th>'
						+'<th>Square Footage Range</th>'
						+'<th>Dataset size</th>'
					+'</thead>'
					+'<tbody></tbody>'
				+'</table></div><hr />');
		for(var num_bed in avg_byBedBath) {
			for(var num_bath in avg_byBedBath[num_bed]) { 
				console.log("   Average price for "+num_bed+" bedrooms and "+num_bath+" bathrooms [Number of this type: "
					+avg_byBedBath[num_bed][num_bath].length+"]: "
					+"$"+numberWithCommas(Math.round(avg_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBedBath[num_bed][num_bath].length)));
				$(".avg_by_bedroom_bathroom table tbody").append('<tr>'
						+'<td>'+num_bed+'</td>'
						+'<td>'+num_bath+'</td>'
						+'<td>$'+numberWithCommas(Math.round(avg_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBedBath[num_bed][num_bath].length))+'</td>'
						+'<td>$'+numberWithCommas(Math.min(...avg_byBedBath[num_bed][num_bath]))+' - $'+numberWithCommas(Math.max(...avg_byBedBath[num_bed][num_bath]))+'</td>'
						+'<td>'+numberWithCommas(Math.min(...square_footage[num_bed][num_bath]))+'sqft - '+numberWithCommas(Math.max(...square_footage[num_bed][num_bath]))+'sqft</td>'
						+'<td>'+avg_byBedBath[num_bed][num_bath].length+'</td>'
					+'</tr>');
			}
		}
	}
});


function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}