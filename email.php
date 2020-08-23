<?php
if($_POST)
{
    $to_email  = "z33zain@gmail.com"; //TODO: Recipient email, Replace with own email here
    
    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( //create JSON data
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    } 
    
    //Sanitize input data using PHP filter_var().
    $name      = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email   = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message      = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    
    $email_message = "Sportvybes user wants more information!.\n\n";
    function clean_string($string) {
        $bad = array("content-type","bcc:","to:","cc:","href");
        return str_replace($bad,"",$string);
    }
    $email_subject = "Sportvybes Landing Page Form";
//    $email_subject = "Promo 1 Quote Request";
    $email_message .= "Name: ".$name."\n";
    $email_message .= "Email: ".$email."\n";
    $email_message .= "Message: ".$message."\n";

    $headers = 'From: '.$email."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    $send_mail = @mail($to_email, $email_subject, $email_message, $headers);
    
    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$name .'. Thank you for your email!'));
        //$output = 'Hi '. $first_name .', Thank you for your email!';
        die($output);
    }
}
?>