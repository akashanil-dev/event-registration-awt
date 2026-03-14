<?php

session_start();

if(!isset($_SESSION['user_id']) || $_SESSION['role'] != "admin"){
    sendResponse(false,array(),"Admin access required");
}

$user_id = $_SESSION['user_id'];

?>