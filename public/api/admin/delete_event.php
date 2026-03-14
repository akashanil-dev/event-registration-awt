<?php

include("../../../config/database.php");
include("../../../app/helpers/response.php");
include("../../../app/middleware/admin.php");

$event_id = $_POST['event_id'];

$sql = "DELETE FROM events WHERE event_id=$event_id";

mysqli_query($conn, $sql);

sendResponse(true);

?>