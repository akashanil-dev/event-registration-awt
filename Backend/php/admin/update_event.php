<?php

include("../config/db.php");
include("../config/response.php");
include("../middleware/admin.php");

$event_id = $_POST['event_id'];
$title = $_POST['title'];
$description = $_POST['description'];

$sql = "UPDATE events
        SET title='$title',description='$description'
        WHERE event_id=$event_id";

mysqli_query($conn,$sql);

sendResponse(true);

?>