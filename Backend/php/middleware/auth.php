<?php

session_start();

if(!isset($_SESSION['user_id'])){
    sendResponse(false,array(),"Not logged in");
}

$user_id = $_SESSION['user_id'];

?>