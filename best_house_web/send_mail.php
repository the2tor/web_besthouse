<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));

    // Validation
    if (empty($name) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Por favor completa todos los campos correctamente."]);
        exit;
    }

    // Email content
    $recipient = "info@besthouse.com"; // Replace with actual email
    $subject = "Nuevo contacto desde la web Best House 2026: $name";
    
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Teléfono: $phone\n";

    $email_headers = "From: $name <$email>";

    // Send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Gracias! Tu mensaje ha sido enviado."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Oops! Algo salió mal, no pudimos enviar tu mensaje."]);
    }

} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Hubo un problema con tu envío, intenta de nuevo."]);
}
?>
