<?php
    // Initialize the session
    session_start();
    
    // Check if the user is logged in, if not then redirect him to login page
    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true){

        header("location: login.php");
        exit;
        
    }
    
    // Include file with database connection
    require_once "includes/config.php";

    // Checks if the page was accessed through method post, which is triggered when submitting the form
    if($_SERVER['REQUEST_METHOD'] === 'POST'){

        // Check if the user won by checking if the score read only input field has been assigned a value
        if(isset($_REQUEST['score'])){

            // Assign the score to a value
            $highscore = (int)$_REQUEST['score'];

            // Create a timestamp of the current date
            date_default_timezone_set('Europe/Copenhagen');
            $date = date("Y-m-d");

            // Retrieve the username from the session
            $username = $_SESSION['username'];

            // Check if the current stored highscore from the database is lower than the score from the new win
            if($highscore > $_SESSION['highscore']){

                // Prepare an update query for the database
                $sql = $conn->prepare("UPDATE users SET highscore = ?, hs_date = ? WHERE username = ?");

                // Bind the variables to the statement
                $sql->bind_param("iss", $highscore, $date, $username);

                // Attempt to execute update query
                if($sql->execute()){

                    // Store the new highscore as the session higscore variable
                    $_SESSION['highscore'] = $highscore;

                }
            }
        }
    }
?>

<!-- Sets the current page variable and includes the header.php -->
<?php $page = "game"; ?>
<?php require_once 'includes/header.php'; ?>

    <h1>Doggy Dash</h1>

    <h2>Collect all treats to get home, but watch out for angry mushrooms</h2>

    <h3 id="points"></h3>

    <canvas width="840" height="520">

    </canvas>

    <div id="modal">

        <div id="popup">

            <h1 id="winlose">TEST</h1>

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">

                <h2 id="alert">Test</h2>

                <h3>
                <input type="submit" name="button" value="Start again">
                </h3>

            </form>

        </div>

    </div>

    <script src="noscroll.js"></script>

<!-- Includes the footer.php -->
<?php require_once 'includes/footer.php'; ?>