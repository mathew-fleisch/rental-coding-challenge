<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rentals Recruitment Coding Challenge - Mathew Fleisch</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-slider.css" rel="stylesheet">
    <link href="css/dataTables.bootstrap.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/jquery.dataTables.js"></script>
    <script src="js/dataTables.bootstrap.js"></script>
    <script src="js/bootstrap-slider.js"></script>
    <script src="js/raw_data.php"></script>
    <script type="text/javascript" src="js/script.js"></script>
  </head>

  <body>
    <h1>Rentals Recruitment Coding Challenge</h1>
    <h3 class="notop">Mathew Fleisch - <a href="mailto:mathew.fleisch@gmail.com">mathew.fleisch@gmail.com</a></h3>
    <h4 class="notop"><a href="RentalsRecruitmentCodingChallenge.html" target="_blank">Challenge Document</a></h4>
    <h4 class="notop"><a href="challenge_data.csv" target="_blank">Initial CSV</a> -> <a href="js/raw_data.php" target="_blank">JSON</a></h4>
    <h4 class="notop"><a href="https://github.com/mathew-fleisch/rental-coding-challenge" target="_blank">Solution Source</a></h4>

    <hr />

    <button id="quick1" class="quick_button btn btn-primary">Casa Maria -  2bd, 2ba, 1250 ft&sup2;</button>
    <button id="quick2" class="quick_button btn btn-primary">Westwood Towers - Studio, 1ba, 750 ft&sup2;</button><br />
    <button id="quick3" class="quick_button btn btn-primary">Bella Fortuna - 3bd, 1ba, 1500 ft&sup2;</button>
    <button id="quick4" class="quick_button btn btn-primary">Palace Apartments - 4bd, 2ba, 2250 ft&sup2;</button><br />
    
    <div id="calculator">
        <div id="predict-container" class="form-group">
            <h3>Rental Price Calculator</h3>
            
            <hr />

            <label for="num_bedrooms">How many bedrooms?</label>
            <input id="bed_rooms" data-slider-id='bedrooms' type="text" data-slider-min="0" data-slider-max="11" data-slider-step="1" data-slider-value="0" />
            <input type="text" id="num_bedrooms" class="form-control" value="1" tabindex="1"  />

            <br class="clear" />

            <label for="num_bathrooms">How many bathrooms?</label>
            <input id="bath_rooms" data-slider-id='bathrooms' type="text" data-slider-min="0" data-slider-max="11" data-slider-step="1" data-slider-value="0" />
            <input type="text" id="num_bathrooms" class="form-control" value="1" tabindex="2"  />

            <br class="clear" />

            <label for="square_footage">What is the square footage?</label>
            <input id="squarefootage" data-slider-id='squarefootage-slider' type="text" data-slider-min="0" data-slider-max="10000" data-slider-step="10" data-slider-value="0" />
            <input type="text" id="square_footage" class="form-control" value="0" tabindex="3"  />

            <br class="clear" />
            <br />

            <br class="clear" />
        </div>

        <div id="calculated-container">
            <h3>Suggested Price</h3>
            <input id="calculator-slider" data-slider-id='calc-slider' type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="-3" data-slider-orientation="vertical"/>
        </div>

        <br class="clear" />    

    </div>
    
    <br class="clear" />   

    <hr />

    <button type="button" id="show-raw" class="btn btn-primary">Show Raw Data <span class="caret"></span></button>
    <div id="container">
        <h3>Raw Rental Data - <button type="button" id="reset-sort" class="btn btn-primary">Reset Sorting</button></h3>
    </div>
    
  </body>
</html>

