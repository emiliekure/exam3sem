<?php
// Initialize the session
session_start();
?>

<!-- Sets the current page variable and includes the header.php -->
<?php $page = "leaderboard"; ?>
<?php require_once 'includes/header.php'; ?>

<h1>Doggy Dash</h1>
<h2>Top 10 highscores</h2>

<!-- SELECT username, highscore, dateOfHS FROM users ORDER BY highscore DESC LIMIT 5 -->

<?php
    require_once 'includes/config.php';
    
    // Display table of data
    $sql = "SELECT username, highscore, hs_date FROM users WHERE highscore > 0 ORDER BY highscore DESC LIMIT 10";
    $result = $conn->query($sql);

    echo '<table>';
    echo '<tr>';
    echo '<th class="place">Place</th>';
    echo '<th>Username</th>';
    echo '<th>Highscore</th>';
    echo '<th>Date</th>';
    echo '</tr>';

    if($result->num_rows > 0)
    {
        $place = 0;

        while($row = $result->fetch_assoc())
        {
            echo '<tr>';
            echo '<td class="place">' . $place += 1 . '</td>';
            echo '<td>' . $row['username'] . '</td>';
            echo '<td>' . $row['highscore'] . '</td>';
            echo '<td>' . date("d-m-Y", strtotime($row['hs_date'])) . '</td>';
            echo '</tr>';
        }
    }
    // else
    // {
    //     echo 'No highscores';
    // }

    echo '</table>';
?>

<!-- Includes the footer.php -->
<?php require_once 'includes/footer.php'; ?>