jQuery(document).ready(function($) { 
	if(typeof raw_data != 'undefined') {
		if(raw_data) { 
			//console.log(raw_data);
			var track           = 0;
			var avg_byBedBath    = [];
			var square_footage   = [];
			var avg_bySquareFoot = [];
			for(var rental in raw_data) { 
				track++;
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


			// console.log("Totals for Bedroom/Bathrooms: ",avg_byBedBath);
			$("#container").append('<div class="avg_by_bedroom_bathroom">'
					+'<table class="table table-hover table-striped table-bordered">'
						+'<thead>'
							+'<th>Number of Bedrooms</th>'
							+'<th>Number of Bathrooms</th>'
							+'<th>Low-End Price</th>'
							+'<th>Average Price</th>'
							+'<th>High-End Price</th>'
							+'<th>Square Footage Range (low)</th>'
							+'<th>Square Footage Range (high)</th>'
							// +'<th>Dataset size</th>'
						+'</thead>'
						+'<tbody></tbody>'
					+'</table></div><hr />');
			for(var num_bed in avg_byBedBath) {
				for(var num_bath in avg_byBedBath[num_bed]) { 
					// console.log("   Average price for "+num_bed+" bedrooms and "+num_bath+" bathrooms [Number of this type: "
					// 	+avg_byBedBath[num_bed][num_bath].length+"]: "
					// 	+"$"+numberWithCommas(Math.round(avg_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBedBath[num_bed][num_bath].length)));
					$(".avg_by_bedroom_bathroom table tbody").append('<tr>'
							+'<td>'+num_bed+'</td>'
							+'<td>'+num_bath+'</td>'
							+'<td>$'+numberWithCommas(Math.min(...avg_byBedBath[num_bed][num_bath]))+'</td>'
							+'<td>$'+numberWithCommas(Math.round(avg_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/avg_byBedBath[num_bed][num_bath].length))+'</td>'
							+'<td>$'+numberWithCommas(Math.max(...avg_byBedBath[num_bed][num_bath]))+'</td>'
							+'<td>'+numberWithCommas(Math.min(...square_footage[num_bed][num_bath]))+'</td>'
							+'<td>'+numberWithCommas(Math.max(...square_footage[num_bed][num_bath]))+'</td>'
							// +'<td>'+avg_byBedBath[num_bed][num_bath].length+'</td>'
						+'</tr>');
				}
			}


			//Initialize datatable
			var raw_table = $('.avg_by_bedroom_bathroom table').dataTable({
				paging: false,
				bFilter: false
			});


			//Reset button binding
			$('body').on('click', '#reset-sort', function() { raw_table.fnSortNeutral(); });

			//Show/Hide raw data button binding
			$('body').on('click', '#show-raw', function() {
				if($('#container').is(":visible")) { 
					$(this).html('Show Raw Data <span class="caret"></span>');
					$('#container').slideUp();
				} else { 
					$(this).html('Hide Raw Data <span class="caret caret-reversed"></span>');
					$("#container").slideDown();
				}
			});

			$('body').on('click', '.bdrm_dropdown', function() {
				$('#bedroom_trig').html('Number of Bedrooms: '+$(this).attr('id').replace(/bdrm_/, '')+' <span class="caret"></span>');
			});

			$('body').on('click', '.bathrm_dropdown', function() {
				$('#bathroom_trig').html('Number of Bathrooms: '+$(this).attr('id').replace(/bathrm_/, '')+' <span class="caret"></span>');
			});

			var init = true;
			$('#bedrooms').slider({
				formatter: function(value) {
					$('#num_bedrooms').val(value);
					calculate_price(avg_byBedBath, square_footage, $('#num_bedrooms').val(), $('#num_bathrooms').val(), $('#square_footage').val(), init);
					return (value > 0 ? (value > 1 ? value + ' Bedrooms' : value + ' Bedroom') : 'Studio');
				}
			});

			$('#bathrooms').slider({
				formatter: function(value) {
					$('#num_bathrooms').val(value);
					calculate_price(avg_byBedBath, square_footage, $('#num_bedrooms').val(), $('#num_bathrooms').val(), $('#square_footage').val(), init);
					return (value > 0 ? (value > 1 ? value + ' Bathrooms' : value + ' Bathroom') : 'No Bathroom');
				}
			});

			$('#squarefootage').slider({
				formatter: function(value) {
					$('#square_footage').val(numberWithCommas(value));
					calculate_price(avg_byBedBath, square_footage, $('#num_bedrooms').val(), $('#num_bathrooms').val(), $('#square_footage').val(), init);
					return 'Square Footage: ' + value;
				}
			});
			init = false;



			// $("#ex4").slider({
			// 	reversed : true,
			// 	ticks: [0, 100, 200, 300, 400],
			// 	ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
			// 	ticks_snap_bounds: 30
			// });

			// $('body').on('click', '#calc-price', function() {
			// 	$('#ex4').slider('setValue', 300);

			// });

		} else { 
			$('#predict-container,#container,#show-raw').hide();
			alert("Could NOT load the raw data. Please make sure the json file is connected and reload.");
		}
	} else { 
		$('#predict-container,#container,#show-raw').hide();
		alert("Could NOT load the raw data. Please make sure the json file is connected and reload.");
	}
});
function calculate_price(prices, square_footage, num_bedrooms, num_bathrooms, num_squarefootage, init) {
	if(!init){
		//Display passed variables in console
		console.log("-----------------");
		console.log("calculate_price(prices, square_footage, num_bedrooms:"+num_bedrooms+", num_bathrooms:"+num_bathrooms+", num_squarefootage:"+num_squarefootage+", init:"+init+")");
		console.log('prices:',prices, 'square_footage:',square_footage);

		//Calculate min, max and average
		var price_low  = Math.min(...prices[num_bedrooms][num_bathrooms]);
		var price_high = Math.max(...prices[num_bedrooms][num_bathrooms]);
		var price_avg  = Math.round(prices[num_bedrooms][num_bathrooms].reduce(function(a,b) { return a+b; }, 0)/prices[num_bedrooms][num_bathrooms].length);

		//Display calculated values in console
		console.log('price_low: '+numberWithCommas(price_low),'price_high: '+numberWithCommas(price_high),'price_avg: '+numberWithCommas(price_avg));

		//Draw vertical slider
		$("#calculator-slider").slider('destroy');
		$("#calculator-slider").slider({
			reversed : true,
			tooltip: 'always',
			ticks: [price_low, price_high],
			ticks_labels: ['Low: $'+numberWithCommas(price_low), 'High: $'+numberWithCommas(price_high)],
			ticks_snap_bounds: 100,
			formatter: function(value) {
				return (value === price_avg ? 'Average Price: $'+numberWithCommas(value) : 'Suggested Price: '+numberWithCommas(value));
			}
		});
		$('#calculator-slider').slider('refresh');
		$('#calculator-slider').slider('setValue',price_avg);
		$('#calculator-slider').slider('disable');

	}
}

function numberWithCommas(x) { x = x.toString(); var pattern = /(-?\d+)(\d{3})/; while (pattern.test(x)) { x = x.replace(pattern, "$1,$2"); } return x; }