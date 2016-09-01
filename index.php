<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rentals Recruitment Coding Challenge - Mathew Fleisch</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap.min.js"></script>
    <script src="js/raw_data.php"></script>
    <script type="text/javascript" src="js/script.js"></script>
  </head>
  <body>
    <h1>Rentals Recruitment Coding Challenge</h1>
    <h2>Mathew Fleisch</h2>

    <div id="predict-container" class="form-group">
        <h3>Rental Price Calculator</h3>

        <hr />

        <label for="num_bedrooms">How many bedrooms?</label>
        <input type="text" id="num_bedrooms" class="form-control" />
        <hr />

        <label for="num_bathrooms">How many bathrooms?</label>
        <input type="text" id="num_bathrooms" class="form-control" />
        <hr />

        <label for="square_footage">What is the square footage?</label>
        <input type="text" id="square_footage" class="form-control" />

        <br />
        <button id="calc-price" class="btn btn-success">Calculate Price</button>
        <br class="clear" />
    </div>

    <hr />

    <button type="button" id="show-raw" class="btn btn-primary">Show Raw Data</button>
    <div id="container">
        <h3>Raw Rental Data</h3>
        <button type="button" id="reset-sort" class="btn btn-primary">Reset Sorting</button>
    </div>
    
  </body>
</html>

