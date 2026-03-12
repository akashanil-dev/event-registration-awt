<?php

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$phone = $data['phone'];

$sql = "INSERT INTO users (name,email,password,phone)
        VALUES ('$name','$email','$password','$phone')";

if(mysqli_query($conn,$sql)){
    echo json_encode([
        "status"=>"success",
        "message"=>"User registered successfully"
    ]);
}else{
    echo json_encode([
        "status"=>"error",
        "message"=>"Registration failed"
    ]);
}

?>