<?php

include("../../../app/helpers/response.php");

session_start();
session_destroy();

sendResponse(true);

?>