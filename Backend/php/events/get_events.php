<?php

include("../config/db.php");
include("../config/response.php");

$sql = "SELECT 
        e.event_id,
        e.title,
        e.description,
        e.category,
        e.total_seats,
        COUNT(r.registration_id) AS registered
        FROM events e
        LEFT JOIN registrations r
        ON e.event_id = r.event_id
        GROUP BY e.event_id";

$result = mysqli_query($conn,$sql);

$events = array();

while($row = mysqli_fetch_assoc($result)){

    $row["available_seats"] = $row["total_seats"] - $row["registered"];

    $events[] = $row;
}

sendResponse(true,$events);

?>