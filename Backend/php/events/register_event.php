<?php

include("../config/db.php");
include("../config/response.php");
include("../middleware/auth.php");

$event_id = $_POST['event_id'];

$sql = "SELECT total_seats FROM events WHERE event_id=$event_id";
$result = mysqli_query($conn,$sql);

$event = mysqli_fetch_assoc($result);

$sql2 = "SELECT COUNT(*) AS total FROM registrations WHERE event_id=$event_id";
$result2 = mysqli_query($conn,$sql2);

$count = mysqli_fetch_assoc($result2)['total'];

if($count >= $event['total_seats']){
    sendResponse(false,array(),"Event full");
}

$sql3 = "INSERT INTO registrations(user_id,event_id)
         VALUES($user_id,$event_id)";

mysqli_query($conn,$sql3);

sendResponse(true);

?>