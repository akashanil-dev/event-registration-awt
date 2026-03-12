<?php

include("../config/response.php");

session_start();
session_destroy();

sendResponse(true);

?>