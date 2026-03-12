<?php

include("../config/db.php");
include("../config/response.php");
include("../middleware/admin.php");

$event_id = $_POST['event_id'];

$sql = "DELETE FROM events WHERE event_id=$event_id";

mysqli_query($conn,$sql);

sendResponse(true);

?>