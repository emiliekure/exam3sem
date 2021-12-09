<?php

    // Connect to database
    $conn = new mysqli('localhost:3306', 'root', 'root', 'game-test');
    
    // Check connection
    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    // echo "Connected successfully" . "<br/>" . "<br/>";

?>