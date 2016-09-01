jQuery(document).ready(function($) { 
	//console.log(raw_data);

	if(raw_data) { 
		var track           = 0;
		var avg_byBedroom    = [];
		var avg_byBathroom   = [];
		var avg_byBedBath    = [];
		var avg_bySquareFoot = [];
		var avg_byTotal      = [];
		for(var rental in raw_data) { 
			track++;
			// console.log(track+": "+parseInt(raw_data[rental]['price']));
			var crnt_price      = parseInt(raw_data[rental]['price']);
			var crnt_bedrooms   = parseInt(raw_data[rental]['bedrooms']);
			var crnt_bathrooms  = parseInt(raw_data[rental]['bathrooms']);
			
			//Aggregate all prices to get an overall average
			avg_byTotal.push(crnt_price);

			//Aggregate prices based on the number of bedrooms
			if(!avg_byBedroom[crnt_bedrooms]) { avg_byBedroom[crnt_bedrooms] = []; }
			avg_byBedroom[crnt_bedrooms].push(crnt_price);

			//Aggregate prices based on the number of bathrooms
			if(!avg_byBathroom[crnt_bathrooms]) { avg_byBathroom[crnt_bathrooms] = []; }
			avg_byBathroom[crnt_bathrooms].push(crnt_price);

			//Aggregate prices based on the number of bedrooms and bathrooms together
			if(!avg_byBedBath[crnt_bedrooms]) { avg_byBedBath[crnt_bedrooms] = []; }
			if(!avg_byBedBath[crnt_bedrooms][crnt_bathrooms]) { avg_byBedBath[crnt_bedrooms][crnt_bathrooms] = []; }
			avg_byBedBath[crnt_bedrooms][crnt_bathrooms].push(crnt_price);

			//Aggregate prices based on the square footage
			if(!avg_bySquareFoot[(Math.ceil(parseInt(raw_data[rental]['square-foot'])/100)*100)]) { avg_bySquareFoot[(Math.ceil(parseInt(raw_data[rental]['square-foot'])/100)*100)] = []; }
			avg_bySquareFoot[(Math.ceil(parseInt(raw_data[rental]['square-foot'])/100)*100)].push(crnt_price);
		}
		console.log("Average: $"+numberWithCommas(Math.round(avg_byTotal.reduce(function(a,b) { return a+b; }, 0)/avg_byTotal.length)));
		$("#container").append('<div class="total_avg"><strong>Average Rental Price: </strong>$'+numberWithCommas(Math.round(avg_byTotal.reduce(function(a,b) { return a+b; }, 0)/avg_byTotal.length))+'</div><hr />');

		console.log("Totals for Bedrooms: ",avg_byBedroom);
		$("#container").append('<div class="avg_by_bedroom"><strong>Average Rental Price (by number of bedrooms): </strong>'
				+'<table class="table table-hover table-striped">'
					+'<thead>'
						+'<th>Number of Bedrooms</th>'
						+'<th>Price</th>'
					+'</thead>'
					+'<tbody></tbody>'
				+'</table></div><hr />');
		for(var num_bedroom in avg_byBedroom) {
			console.log("   Average price for "+num_bedroom+" bedrooms[Number of this type: "+avg_byBedroom[num_bedroom].length+"]: $"+numberWithCommas(Math.round(avg_byBedroom[num_bedroom].reduce(function(a,b) { return a+b; }, 0)/avg_byBedroom[num_bedroom].length)));
			$(".avg_by_bedroom table tbody").append('<tr><td>'+num_bedroom+'</td><td>$'+numberWithCommas(Math.round(avg_byBedroom[num_bedroom].reduce(function(a,b) { return a+b; }, 0)/avg_byBedroom[num_bedroom].length))+'</td></tr>');
		}

		console.log("Totals for Bathrooms: ",avg_byBathroom);
		$("#container").append('<div class="avg_by_bathroom"><strong>Average Rental Price (by number of bathrooms): </strong>'
				+'<table class="table table-hover table-striped">'
					+'<thead>'
						+'<th>Number of Bathrooms</th>'
						+'<th>Price</th>'
					+'</thead>'
					+'<tbody></tbody>'
				+'</table></div><hr />');
		for(var num_bath in avg_byBathroom) {
			console.log("   Average price for "+num_bath+" bathrooms[Number of this type: "+avg_byBathroom[num_bath].length+"]: $"+numberWithCommas(Math.round(avg_byBathroom[num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBathroom[num_bath].length)));
			$(".avg_by_bathroom table tbody").append('<tr><td>'+num_bath+'</td><td>$'+numberWithCommas(Math.round(avg_byBathroom[num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBathroom[num_bath].length))+'</td></tr>');
		}

		console.log("Totals for Bedroom/Bathrooms: ",avg_byBedBath);
		$("#container").append('<div class="avg_by_bedroom_bathroom"><strong>Average Rental Price (by number of bedrooms and bathrooms): </strong>'
				+'<table class="table table-hover table-striped">'
					+'<thead>'
						+'<th>Number of Bedrooms</th>'
						+'<th>Number of Bathrooms</th>'
						+'<th>Price</th>'
					+'</thead>'
					+'<tbody></tbody>'
				+'</table></div><hr />');
		for(var num_bed in avg_byBedBath) {
			for(var num_bath in avg_byBedBath[num_bed]) { 
				console.log("   Average price for "+num_bed+" bedrooms and "+num_bath+" bathrooms [Number of this type: "+avg_byBedBath[num_bed][num_bath].length+"]: $"+numberWithCommas(Math.round(avg_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBedBath[num_bed][num_bath].length)));
				$(".avg_by_bedroom_bathroom table tbody").append('<tr><td>'+num_bed+'</td><td>'+num_bath+'</td><td>$'+numberWithCommas(Math.round(avg_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBedBath[num_bed][num_bath].length))+'</td></tr>');
			}
		}
		console.log("Totals for Sqare-footage: ",avg_bySquareFoot);
		var last = 0;
		for(var num_sf in avg_bySquareFoot) {
			console.log("   Average price for "+last+" - "+num_sf+"[Number of this type: "+avg_bySquareFoot[num_sf].length+"] square footage: $"+numberWithCommas(Math.round(avg_bySquareFoot[num_sf].reduce(function(a,b) { return a+b; }, 0)/avg_bySquareFoot[num_sf].length)));
			last = parseInt(num_sf)+1;
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