<?php
    // Initialize the session
    session_start();
    
    // Check if the user is already logged in, if yes then redirect to game page
    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true){

        header("location: game.php");
        exit;

    }
    
    // Include file with database connection
    require_once "includes/config.php";

    // Define variables and initialize with empty values
    $username = $password = "";
    $usernameErr = $passwordErr = $loginErr = "";

    // Checks if the page was accessed through method post, which is triggered when submitting the form
    if($_SERVER['REQUEST_METHOD'] === 'POST'){

        // Check if username field is empty
        if(empty(trim($_REQUEST['username']))){

            $usernameErr = "Please enter username.";

        } else {

            $username = trim($_REQUEST['username']);

        }

        // Check if password field is empty
        if(empty(trim($_REQUEST['password']))){

            $passwordErr = "Please enter your password.";

        } else {

            $password = trim($_REQUEST['password']);

        }

        // Validation of input
        // If the error message strings are both empty, proceed to validate
        if(empty($usernameErr) && empty($passwordErr)){

            // Prepare a select query for the database, to retrieve the user info
            $sql = $conn->prepare("SELECT id, username, password, highscore FROM users WHERE username = ?");
            
            // Binds the input username as a string to the SQL query
            $sql->bind_param("s", $username);
            
            // Execute the query
            if($sql->execute()){

                // Store the result
                $sql->store_result();
                
                // Check if 1 row of data exists where the query is true, then verify password
                if($sql->num_rows == 1){

                    // Bind the result data from the query to PHP variables
                    $sql->bind_result($id, $username, $hashed_password, $highscore);
                    
                    // Fetch the result into the bound variables
                    $sql->fetch();
                    
                    // Check if hashed input password matches stored password hash
                    if(password_verify($password, $hashed_password)){

                        // If verification was successful data is stored in session variables
                        $_SESSION['loggedin'] = true;
                        $_SESSION['id'] = $id;
                        $_SESSION['username'] = $username;
                        $_SESSION['highscore'] = $highscore;
                        
                        // Redirect to game page
                        header("location: game.php");

                    // Password is invalid, display a generic error message
                    } else {

                        $loginErr = "Invalid username or password";

                    }

                // Username doesn't exist, display a generic error message
                } else {

                    $loginErr = "Invalid username or password";

                }
            } else {

                $loginErr = "Sorry, something went wrong, please try again later.";

            }

        }
    
        // Close connection
        $conn->close();

    }
?>

<!-- Sets the current page variable and includes the header.php -->
<?php $page = "home"; ?>
<?php require_once 'includes/header.php'; ?>

    <h1>Doggy Dash</h1>
    <h2>Log in or sign up to play the game</h2>

    <div id="forms">

        <div id="login">

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">

                <h3>Log in</h3>

                <!-- Error message if login fails -->
                <?php 
                    if(!empty($loginErr)){
                        echo '<div class="form-fail">' . $loginErr . '</div>';
                    }
                ?>
        
                <label for="username" class="required">Username</label>
                <input type="text" name="username" id="username">
                <!-- Error message if username field is empty -->
                <?php 
                    if(!empty($usernameErr)){
                        echo '<div class="feedback">' . $usernameErr . '</div>';
                    }
                ?>
                
                <label for="password" class="required">Password</label>
                <input type="password" name="password" id="password">
                <!-- Error message if password field is empty -->
                <?php 
                    if(!empty($passwordErr)){
                        echo '<div class="feedback">' . $passwordErr . '</div>';
                    }
                ?>

                <input type="submit" name="button" value="Log in">

                <p>Don't have an account? <a href="register.php">Sign up now</a>.</p>
                
            </form>

        </div>

    </div>

<!-- Includes the footer.php -->
<?php require_once 'includes/footer.php'; ?>