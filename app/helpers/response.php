<?php

header("Content-Type: application/json");

function sendResponse($success,$data=array(),$message=""){

    $response = array();

    $response["success"] = $success;
    $response["data"] = $data;
    $response["message"] = $message;

    echo json_encode($response);
    exit();
}

?>