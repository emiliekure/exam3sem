<?php
    // Initialize the session
    session_start();

    // Include file with database connection
    require_once "includes/config.php";

    // Define variables and initialize with empty values
    $username = $password = $confirmpw = $email = "";
    $highscore = 0;
    $usernameErr = $passwordErr = $confirmpwErr = $emailErr = $regErr = "";

    // Checks if the page was accessed through method post, which is triggered when submitting the form
    if($_SERVER['REQUEST_METHOD'] === 'POST'){

        // Validation of username
        // Check if field is empty
        if(empty(trim($_REQUEST['username']))){

            $usernameErr = "Please enter a username";

        // Check if field contains characters other than letters, numbers or underscores
        } elseif(!preg_match('/^[a-zA-Z0-9_]+$/', trim($_REQUEST['username']))){

            $usernameErr = "Username can only contain letters, numbers, and underscores";

        // Check if username already exists
        } else{

            // Prepare a select query for the database
            $sql = $conn->prepare("SELECT id FROM users WHERE username = ?");
            
            // Bind variables to the prepared statement as parameters
            $sql->bind_param("s", $param_username);
                
            // Set parameters
            $param_username = trim($_REQUEST['username']);

            // Attempt to execute the prepared statement
            if($sql->execute()){

                // Get result
                $sql->get_result();

                // Check if there is a row where the input username matches the stored username
                if($sql->num_rows == 1){

                    $usernameErr = "This username is already taken";

                // If the username does not already exist, it is stored as a variable to be inserted in the database
                } else{

                    $username = trim($_REQUEST['username']);

                }

            } else{

                $regErr = "Sorry, something went wrong, please try again later.";

            }
            
        }

        // Validation of password
        // Check if field is empty
        if(empty(trim($_REQUEST['password']))){

            $passwordErr = "Please enter a password";

        // Check if the input string is less than 8 characters
        } elseif(strlen(trim($_REQUEST['password'])) < 8){

            $passwordErr = "Password must be at least 8 characters";

        // If the password is validated, it is stored as a variable to be inserted in the database
        } else{

            $password = trim($_REQUEST['password']);

        }

        // Validation of confirmed password
        // Check if field is empty
        if(empty(trim($_REQUEST['confirmpw']))){

            $confirmpwErr = "Please confirm password";

        // Store the confirmed password as a variable
        } else{

            $confirmpw = trim($_REQUEST['confirmpw']);

            // Check if confirmed password matches password
            if(empty($passwordErr) && ($password != $confirmpw)){

                $confirmpwErr = "Password does not match";

            }

        }

        // Validation of email
        // Check if field is empty
        if(empty(trim($_REQUEST['email']))){

            $emailErr = "Please enter an e-mail";

        // Remove illegal characters from e-mail
        } else{

            $email = filter_var(trim($_REQUEST['email']), FILTER_SANITIZE_EMAIL);

            // Check if input is a valid e-mail address
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)){

                $emailErr = "Please enter a valid e-mail";

            // Check if e-mail already exists
            } else{

                // Prepare a select query for the database
                $sql = $conn->prepare("SELECT id FROM users WHERE email = ?");
                
                // Bind variables to the prepared statement as parameters
                $sql->bind_param("s", $param_email);
                
                // Set parameters
                $param_email = trim($_REQUEST['email']);
                
                // Attempt to execute the prepared statement
                if($sql->execute()){
    
                    //Get result
                    $sql->get_result();
    
                    // Check if there is a row where the input email matches the stored email
                    if($sql->num_rows == 1){
    
                        $emailErr = "This e-mail is already taken";
    
                    // If the e-mail does not already exist, it is stored as a variable to be inserted in the database
                    } else{
    
                        $email = trim($_REQUEST['email']);
    
                    }
    
                } else{

                    $regErr = "Sorry, something went wrong, please try again later.";

                }
                
            }

        }

        // Check input errors before inserting into database
        if(empty($usernameErr) && empty($passwordErr) && empty($confirmpwErr) && empty($emailErr)){

            // Prepare an insert query for the database
            $sql = $conn->prepare("INSERT INTO users (username, password, email, highscore) VALUES (?, ?, ?, ?)");

            // Bind variables to the prepared statement as parameters
            $sql->bind_param("sssi", $username, $hashedpw, $email, $highscore);
            
            // Set parameters
            $hashedpw = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

            // Attempt to execute the prepared statement
            if($sql->execute()){

                // If execution was successful data is stored in session variables
                $_SESSION['loggedin'] = true;
                $_SESSION['id'] = $id;
                $_SESSION['username'] = $username;
                $_SESSION['highscore'] = $highscore;
                
                // Redirect to game page
                header("location: game.php");

            } else{

                $regErr = "Sorry, something went wrong, please try again later.";

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

        <div id="signup">

            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">

                <h3>Sign up</h3>

                <!-- Error message if registration fails -->
                <?php 
                    if(!empty($regErr)){
                        echo '<div class="form-fail">' . $regErr . '</div>';
                    }
                ?>
        
                <label for="username" class="required">Username</label>
                <input type="text" name="username" id="username">
                <!-- Error message if the PHP variable string $usernameErr is not empty, meaning something is wrong -->
                <?php 
                    if(!empty($usernameErr)){
                        echo '<div class="feedback">' . $usernameErr . '</div>';
                    }

                    // echo '<div class="feedback">Error</div>';
                ?>
                
                <label for="password" class="required">Password</label>
                <input type="password" name="password" id="password">
                <!-- Error message if the PHP variable string $passwordErr is not empty, meaning something is wrong -->
                <?php 
                    if(!empty($passwordErr)){
                        echo '<div class="feedback">' . $passwordErr . '</div>';
                    }

                    // echo '<div class="feedback">Error</div>';
                ?>

                <label for="confirmpw" class="required">Confirm password</label>
                <input type="password" name="confirmpw" id="confirmpw">
                <!-- Error message if the PHP variable string $confirm_passwordErr is not empty, meaning something is wrong -->
                <?php 
                    if(!empty($confirm_passwordErr)){
                        echo '<div class="feedback">' . $confirm_passwordErr . '</div>';
                    }

                    // echo '<div class="feedback">Error</div>';
                ?>

                <label for="email" class="required">E-mail</label>
                <input type="text" name="email" id="email">
                <!-- Error message if the PHP variable string $emailErr is not empty, meaning something is wrong -->
                <?php 
                    if(!empty($emailErr)){
                        echo '<div class="feedback">' . $emailErr . '</div>';
                    }

                    // echo '<div class="feedback">Error</div>';
                ?>
                
                <input type="submit" name="button" value="Sign up">

                <p>Already have an account? <a href="login.php">Login here</a>.</p>
                
            </form>

        </div>

    </div>

<!-- Includes the footer.php -->
<?php require_once('includes/footer.php'); ?>