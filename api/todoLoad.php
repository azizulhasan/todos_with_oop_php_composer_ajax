<?php
require '../vendor/autoload.php';

use App\classes\Todo;

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
$data = file_get_contents("php://input");
$data = array();
$status ="";
$todo = new Todo();
$status = $todo->ReadTodo("*", "todos" );
while($d = $status->fetch_assoc()){
    
    $data[] =$d;
}
echo json_encode($data);