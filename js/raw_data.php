<?php
echo "raw_data = ".csvToJson("../challenge_data.csv").";";
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