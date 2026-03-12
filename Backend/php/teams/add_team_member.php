<?php

include("../config/db.php");
include("../config/response.php");

$team_id = $_POST['team_id'];
$email = $_POST['email'];

$sql = "SELECT event_id FROM teams WHERE team_id=$team_id";
$result = mysqli_query($conn,$sql);

$team = mysqli_fetch_assoc($result);
$event_id = $team['event_id'];

$sql2 = "SELECT max_team_size FROM events WHERE event_id=$event_id";
$result2 = mysqli_query($conn,$sql2);

$event = mysqli_fetch_assoc($result2);
$max = $event['max_team_size'];

$sql3 = "SELECT COUNT(*) AS total FROM team_members WHERE team_id=$team_id";
$result3 = mysqli_query($conn,$sql3);

$count = mysqli_fetch_assoc($result3)['total'];

if($count >= $max){
    sendResponse(false,array(),"Team full");
}

$sql4 = "INSERT INTO team_members(team_id,email)
         VALUES($team_id,'$email')";

mysqli_query($conn,$sql4);

sendResponse(true);

?>