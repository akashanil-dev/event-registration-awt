<?php

include("../../../config/database.php");
include("../../../app/helpers/response.php");
include("../../../app/middleware/auth.php");

$team_name = $_POST['team_name'];
$event_id = $_POST['event_id'];

$sql = "INSERT INTO teams(team_name,event_id,leader_id)
        VALUES('$team_name',$event_id,$user_id)";

mysqli_query($conn, $sql);

$team_id = mysqli_insert_id($conn);

$data = array("team_id" => $team_id);

sendResponse(true, $data);

?>