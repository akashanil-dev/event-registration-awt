<?php

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($conn,$sql);

if(mysqli_num_rows($result) > 0){

    $user = mysqli_fetch_assoc($result);

    if($user['password'] == $password){

        echo json_encode([
            "status"=>"success",
            "message"=>"Login successful",
            "user"=>$user
        ]);

    } else {
        echo json_encode([
            "status"=>"error",
            "message"=>"Invalid password"
        ]);
    }

}else{

    echo json_encode([
        "status"=>"error",
        "message"=>"User not found"
    ]);
}

?>