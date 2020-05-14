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
    // print_r($_POST);
    // exit;
    $arr = [
        'title'  => $title
    ];
    $where = [
        'id'     => $id
    ];
    $status = $todo->UpdateTodo("todos", $arr, $where);
    if($status){
    $result = $todo->ReadTodo("*", 'todos', ['id' => $id]);
    $data[] = $result->fetch_object();
     
    }
    else{
        $data['status'] = 0;
    }
}
header('Content-Type: application/json');
echo json_encode($data);
die();
