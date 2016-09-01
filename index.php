<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rentals Recruitment Coding Challenge - Mathew Fleisch</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/dataTables.bootstrap.min.css" rel="stylesheet">
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap.min.js"></script>
    <?php
  	echo "<script>raw_data = ".csvToJson("challenge_data.csv").";</script>";
  	function csvToJson($fname) {
  	    if (!($fp = fopen($fname, 'r'))) { die("Can't open file..."); }
  	    $key = fgetcsv($fp,"1024",",");
  	    $json = array();
  	        while ($row = fgetcsv($fp,"1024",",")) {
  	        $json[] = array_combine($key, $row);
  	    }
  	    fclose($fp);
  	    return json_encode($json);
  	}
  	?>
  	<script type="text/javascript" src="js/script.js"></script>
  </head>
  <body>
    <h1>Rentals Recruitment Coding Challenge</h1>
    <h2>Mathew Fleisch</h2>
    <button id="reset-sort">Reset Sorting</button>
    <div id="container"></div>
    
  </body>
</html>

