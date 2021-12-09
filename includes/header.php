<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doggy Dash</title>
    <script src="game.js" defer></script>
    <link rel="stylesheet" href="style/style.css">
</head>

<body>

<nav>
    <div id="header">
        <p>
            <?php
                if(isset($_SESSION['username']))
                {
                    echo 'Hi, <span id="user">' . $_SESSION['username'] . '</span>';
                }
                else
                {
                    echo 'Welcome!';
                }
            ?>
        </p>
        <ul id="menu">
            <li>
                <a href="<?php echo (isset($_SESSION['username']) ? "game.php" : "login.php")?>" class="<?php echo ($page == "home" || $page == "game" ? "active" : "")?>">Home</a> 
            </li>
            <li>
                <a href="leaderboard.php" class="<?php echo ($page == "leaderboard" ? "active" : "")?>">Leaderboard</a>
            </li>
            <li>
                <a href="logout.php">Log out</a>
            </li>
        </ul>
    </div>
</nav>