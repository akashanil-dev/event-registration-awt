<?php

include("../config/db.php");
include("../config/response.php");
include("../middleware/admin.php");

$title = $_POST['title'];
$description = $_POST['description'];
$category = $_POST['category'];
$type = $_POST['event_type'];
$team_size = $_POST['max_team_size'];
$seats = $_POST['total_seats'];
$date = $_POST['event_date'];
$location = $_POST['location'];

$sql = "INSERT INTO events
(title,description,category,event_type,max_team_size,total_seats,event_date,location)
VALUES
('$title','$description','$category','$type',$team_size,$seats,'$date','$location')";

mysqli_query($conn,$sql);

sendResponse(true);

?>