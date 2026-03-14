<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "tech_event";

$conn = mysqli_connect($host,$user,$password,$database);

if(!$conn){
    die("Database connection failed");
}

?>