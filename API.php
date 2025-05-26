<?php
header('Content-Type: application/json');

// Configurações do banco
$host = "localhost";
$dbname = "filmes_db";
$username = "root"; // padrão XAMPP
$password = ""; // padrão XAMPP

// Conectar banco
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Falha na conexão com banco"]);
    exit;
}

$action = $_REQUEST['action'] ?? '';

switch ($action) {
    case 'list':
        $result = $conn->query("SELECT * FROM filmes ORDER BY id DESC");
        $filmes = [];
        while ($row = $result->fetch_assoc()) {
            $filmes[] = $row;
        }
        echo json_encode($filmes);
        break;

    case 'add':
        $nome = $_POST['nome'] ?? '';
        $genero = $_POST['genero'] ?? '';
        $duracao = intval($_POST['duracao'] ?? 0);
        $assistido = intval($_POST['assistido'] ?? 0);

        if (!$nome || !$genero || $duracao <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Dados inválidos"]);
            break;
        }

        $stmt = $conn->prepare("INSERT INTO filmes (nome, genero, duracao, assistido) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssii", $nome, $genero, $duracao, $assistido);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    case 'delete':
        $id = intval($_GET['id'] ?? 0);
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            break;
        }
        $stmt = $conn->prepare("DELETE FROM filmes WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    case 'update':
        $id = intval($_POST['id'] ?? 0);
        $assistido = intval($_POST['assistido'] ?? 0);

        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            break;
        }

        $stmt = $conn->prepare("UPDATE filmes SET assistido = ? WHERE id = ?");
        $stmt->bind_param("ii", $assistido, $id);
        $stmt->execute();
        echo json_encode(["success" => true]);
        break;

    default:
        http_response_code(400);
        echo json_encode(["error" => "Ação inválida"]);
}

$conn->close();
?>
