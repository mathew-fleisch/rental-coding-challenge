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
    <h3 class="notop">Mathew Fleisch - <a href="mailto:mathew.fleisch@gmail.com">mathew.fleisch@gmail.com</a></h3>
    <h4 class="notop"><a href="RentalsRecruitmentCodingChallenge.html" target="_blank">Challenge Document</a></h4>
    <h4 class="notop"><a href="challenge_data.csv" target="_blank">Initial CSV</a> - <a href="js/raw_data.php" target="_blank">Transformed to JSON</a></h4>
    <h4 class="notop"><a href="https://github.com/mathew-fleisch/rental-coding-challenge" target="_blank">Solution Source</a></h4>

    <hr />

    <div id="predict-container" class="form-group">
        <h3>Rental Price Calculator</h3>

        <hr />
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Number of bedrooms <span class="caret"></span></button>
            <ul class="dropdown-menu bedroom_dropdown">
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_0">0</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_1">1</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_2">2</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_3">3</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_4">4</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_5">5</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_6">6</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_7">7</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_8">8</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_9">9</a></li>
                <li><a href="javascript:;" class="bdrm_dropdown" id="bdrm_10">10</a></li>
            </ul>
        </div>
        <input type="text" size="2" class="form-control" id="num_bedroom" readonly="readonly" />
        <hr />

        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Number of bathrooms <span class="caret"></span></button>
            <ul class="dropdown-menu bathroom_dropdown">
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_0">0</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_1">1</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_2">2</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_3">3</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_4">4</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_5">5</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_6">6</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_7">7</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_8">8</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_9">9</a></li>
                <li><a href="javascript:;" class="bathrm_dropdown" id="bathrm_10">10</a></li>
            </ul>
        </div>
        <input type="text" size="2" class="form-control" id="num_bathroom" readonly="readonly" />
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

