<?php

include("../config/db.php");
include("../config/response.php");

$event_id = $_GET['event_id'];

$sql = "SELECT users.name,users.email
        FROM registrations
        JOIN users
        ON users.user_id = registrations.user_id
        WHERE registrations.event_id=$event_id";

$result = mysqli_query($conn,$sql);

$data = array();

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

sendResponse(true,$data);

?>