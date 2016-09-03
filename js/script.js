jQuery(document).ready(function($) { 
	if(typeof raw_data != 'undefined') {
		if(raw_data) { 
			var track               = 0;
			var price_byBedBath     = [];
			var square_footage      = [];
			for(var rental in raw_data) { 
				track++;
				var crnt_price      = parseInt(raw_data[rental]['price']);
				var crnt_bedrooms   = parseInt(raw_data[rental]['bedrooms']);
				var crnt_bathrooms  = parseInt(raw_data[rental]['bathrooms']);
				var crnt_sqfootage  = parseInt(raw_data[rental]['square-foot']);
				

				//Aggregate prices based on the number of bedrooms and bathrooms
				if(!price_byBedBath[crnt_bedrooms]) { price_byBedBath[crnt_bedrooms] = []; }
				if(!price_byBedBath[crnt_bedrooms][crnt_bathrooms]) { price_byBedBath[crnt_bedrooms][crnt_bathrooms] = []; }
				price_byBedBath[crnt_bedrooms][crnt_bathrooms].push(crnt_price);

				//Aggregate square footages by bedrooms and bathrooms
				if(!square_footage[crnt_bedrooms]) { square_footage[crnt_bedrooms] = []; }
				if(!square_footage[crnt_bedrooms][crnt_bathrooms]) { square_footage[crnt_bedrooms][crnt_bathrooms] = []; }
				square_footage[crnt_bedrooms][crnt_bathrooms].push(crnt_sqfootage);
			}

			initialize_raw_data_table(price_byBedBath, square_footage);

			initialize_sliders(price_byBedBath, square_footage);

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
		if(!$('#calculated-container').is(":visible")) { $('#calculated-container').slideDown(); }

		//Calculate min, med, max and average
		var price_low  = (prices.hasOwnProperty(num_bedrooms) ? (prices[num_bedrooms].hasOwnProperty(num_bathrooms) ? Math.min(...prices[num_bedrooms][num_bathrooms]) : 1000) : 1000);
		var price_high = (prices.hasOwnProperty(num_bedrooms) ? (prices[num_bedrooms].hasOwnProperty(num_bathrooms) ? Math.max(...prices[num_bedrooms][num_bathrooms]) : 6000) : 6000);
		var price_med  = parseInt((price_high - price_low)/2);
		var price_avg  = (prices.hasOwnProperty(num_bedrooms) ? (prices[num_bedrooms].hasOwnProperty(num_bathrooms) ? Math.round(prices[num_bedrooms][num_bathrooms].reduce(function(a,b) { return a+b; }, 0)/prices[num_bedrooms][num_bathrooms].length) : 1000) : 1000);
		
		var perc_sqft  = parseInt(num_squarefootage.replace(/,/g, '').replace(/\s*ft.*$/g, ''))/100;
		var sqft_low   = (square_footage.hasOwnProperty(num_bedrooms) ? (square_footage[num_bedrooms].hasOwnProperty(num_bathrooms) ? Math.min(...square_footage[num_bedrooms][num_bathrooms]) : 0) : 0);
		var sqft_high  = (square_footage.hasOwnProperty(num_bedrooms) ? (square_footage[num_bedrooms].hasOwnProperty(num_bathrooms) ? Math.max(...square_footage[num_bedrooms][num_bathrooms]) : 10000) : 10000);

		if($('#squarefootage-slider').length) { $('#squarefootage').slider('destroy'); }
		$('#squarefootage').slider({
			ticks: [0, sqft_low, sqft_high, (sqft_high+sqft_low)],
			ticks_labels: [0+'ft&sup2;', 'Low<br />'+numberWithCommas(sqft_low)+'ft&sup2;', 'High<br />'+numberWithCommas(sqft_high)+'ft&sup2;', (sqft_high+sqft_low)+'ft&sup2;'],
			ticks_snap_bounds: 10,
			formatter: function(value) {
				$('#square_footage').val(numberWithCommas(value)+'ft²');
				perc_sqft  = (value >= sqft_low ? (value <= sqft_high ? parseInt( ( (sqft_low - value) / (sqft_high - sqft_low) ) * -100 ) : 100) : 0);
				draw_vertical_slider(price_low, price_med, price_high, price_avg, perc_sqft, sqft_low, sqft_high);
				return numberWithCommas(value)+'ft²';
			}
		});
		$('#squarefootage').slider('refresh');
		draw_vertical_slider(price_low, price_med, price_high, price_avg, perc_sqft, sqft_low, sqft_high);
	}
}

function draw_vertical_slider(price_low, price_med, price_high, price_avg, perc_sqft, sqft_low, sqft_high) { 
	if($('#calc-slider').length) { $("#calculator-slider").slider('destroy'); }
	$("#calculator-slider").slider({
		reversed : true,
		tooltip: 'always',
		ticks: [price_low, price_high],
		ticks_labels: ['Low: $'+numberWithCommas(price_low), 'High: $'+numberWithCommas(price_high)],
		/*
		//With median price
		ticks: [price_low, price_med, price_high],
		ticks_labels: ['Low: $'+numberWithCommas(price_low), 'Median: $'+numberWithCommas(price_med), 'High: $'+numberWithCommas(price_high)],
		*/
		ticks_snap_bounds: 100,
		formatter: function(value) {
			return (value === price_avg ? (price_avg === 1000 && price_low === 1000 ? 'Insufficent data...' : 'Average Price: $'+numberWithCommas(value) ) : 'Suggested Price: $'+numberWithCommas(value));
		}
	});
	$('#calculator-slider').slider('setValue',(perc_sqft > 0 ? ( ( (price_high - price_low) * (perc_sqft / 100) ) + price_low ) : price_avg));
	$('#calculator-slider').slider('disable');
}

function initialize_raw_data_table(price_byBedBath, square_footage) { 
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
				+'</thead>'
				+'<tbody></tbody>'
			+'</table></div><hr />');
	for(var num_bed in price_byBedBath) {
		for(var num_bath in price_byBedBath[num_bed]) { 
			$(".avg_by_bedroom_bathroom table tbody").append('<tr>'
					+'<td>'+num_bed+'</td>'
					+'<td>'+num_bath+'</td>'
					+'<td>$'+numberWithCommas(Math.min(...price_byBedBath[num_bed][num_bath]))+'</td>'
					+'<td>$'+numberWithCommas(Math.round(price_byBedBath[num_bed][num_bath].reduce(function(a,b) { return a+b; }, 0)/price_byBedBath[num_bed][num_bath].length))+'</td>'
					+'<td>$'+numberWithCommas(Math.max(...price_byBedBath[num_bed][num_bath]))+'</td>'
					+'<td>'+numberWithCommas(Math.min(...square_footage[num_bed][num_bath]))+'</td>'
					+'<td>'+numberWithCommas(Math.max(...square_footage[num_bed][num_bath]))+'</td>'
				+'</tr>');
		}
	}
	//Enumerate DataTable()
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
}
function initialize_sliders(price_byBedBath, square_footage) {
	var init = true;
	$('#bed_rooms').slider({
		formatter: function(value) {
			$('#num_bedrooms').val(value);
			calculate_price(price_byBedBath, square_footage, $('#num_bedrooms').val(), $('#num_bathrooms').val(), $('#square_footage').val(), init);
			return (value > 0 ? (value > 1 ? value + ' Bedrooms' : value + ' Bedroom') : 'Studio');
		}
	});
	$('#bed_rooms').slider('refresh');


	$('#bath_rooms').slider({
		formatter: function(value) {
			$('#num_bathrooms').val(value);
			calculate_price(price_byBedBath, square_footage, $('#num_bedrooms').val(), $('#num_bathrooms').val(), $('#square_footage').val(), init);
			return (value > 0 ? (value > 1 ? value + ' Bathrooms' : value + ' Bathroom') : 'No Bathroom');
		}
	});
	$('#bath_rooms').slider('refresh');

	$('#squarefootage').slider({
		formatter: function(value) {
			$('#square_footage').val(numberWithCommas(value));
			calculate_price(price_byBedBath, square_footage, $('#num_bedrooms').val(), $('#num_bathrooms').val(), $('#square_footage').val(), init);
			return 'Square Footage: ' + numberWithCommas(value);
		}
	});
	init = false;
	$(document).on('input', '#num_bedrooms', function (e) {
		var value = parseInt($(this).val());
		if($.isNumeric(value)) {
			if(value > -1 && value < 12) {
				console.log("Typed Bedroom: "+value);
				$('#bed_rooms').slider('setValue', value);
			} else { $(this).val('0'); }
		} else { $(this).val('0'); }
	});

	$(document).on('input', '#num_bathrooms', function (e) {
		var value = parseInt($(this).val());
		if($.isNumeric(value)) {
			if(value > -1 && value < 11) {
				console.log("Typed bathrooms: "+value);
				$('#bath_rooms').slider('setValue', value);
			} else { $(this).val('0'); }
		} else { $(this).val('0'); }
	});
	$(document).on('change focus', '#square_footage', function (e) {
		console.log(e);
		if(e['type'].match(/focus/)) {
			$(this).val($(this).val().replace(/,/g, '').replace(/\s*ft.*$/g, ''));
		} else {
			var value = parseInt($(this).val());
			console.log(value);
			if($.isNumeric(value)) {
				if(value > -1 && value < 10000) {
					console.log("Typed square footage: "+value);
					$('#squarefootage').slider('setValue', value);
				} else { $(this).val('0'); }
			} else { $(this).val('0'); }
		}
	});


	$('body').on('click', '.quick_button', function() {
		var id = parseInt($(this).attr("id").replace(/quick/, ''));
		switch(id) {
			case 1:
				$('#bed_rooms').slider('setValue', 2); $('#bath_rooms').slider('setValue', 2); $('#squarefootage').slider('setValue', 1250); break;
			case 2:
				$('#bed_rooms').slider('setValue', 0); $('#bath_rooms').slider('setValue', 1); $('#squarefootage').slider('setValue', 750);  break;
			case 3:
				$('#bed_rooms').slider('setValue', 3); $('#bath_rooms').slider('setValue', 1); $('#squarefootage').slider('setValue', 1500); break;
			case 4:
				$('#bed_rooms').slider('setValue', 4); $('#bath_rooms').slider('setValue', 2); $('#squarefootage').slider('setValue', 2250); break;
		}
	});
}


function numberWithCommas(x) { x = x.toString(); var pattern = /(-?\d+)(\d{3})/; while (pattern.test(x)) { x = x.replace(pattern, "$1,$2"); } return x; }