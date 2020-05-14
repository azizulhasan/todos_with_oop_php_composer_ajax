<?php
require '../vendor/autoload.php';
use App\classes\Todo;

header("Access-Control-Allow-Origin: *");
// header('Content-Type: text/html; charset=utf-8');
file_get_contents("php://input");
$data = array();
$status ="";
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	$todo = new Todo();
    extract($_POST);
    $ids = count($_POST['id']);
    for($i = 0; $i<$ids; $i++ ){
        $status = $todo->DeleteTodo("todos", $_POST['id'][$i]);
    }
    if($status){
    $data['status']= 1;
    }
    else{
        $data['status'] = 0;
    }
}
header('Content-Type: application/json');
echo json_encode($data);
die();
