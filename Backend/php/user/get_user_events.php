<?php

include("../config/db.php");
include("../config/response.php");
include("../middleware/auth.php");

$sql = "SELECT events.title,events.event_date
        FROM registrations
        JOIN events
        ON events.event_id = registrations.event_id
        WHERE registrations.user_id=$user_id";

$result = mysqli_query($conn,$sql);

$data = array();

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

sendResponse(true,$data);

?>