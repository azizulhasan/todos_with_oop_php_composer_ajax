<?php
require '../vendor/autoload.php';
use App\classes\Todo;

header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset=utf-8');
file_get_contents("php://input");
$data = array();
$status ="";

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	$todo = new Todo();
	extract($_POST);
	$arr = [
		'title'    	=> $title
    ];
    $status=  $todo->Insert("todos", $arr);
    if($status){
    $result = $todo->ReadTodo("*", 'todos', ['id' => $todo->id]);
    $data[] = $result->fetch_object();
    }
    else{
        $data['status'] = 0;
    }
}
header('Content-Type: application/json');
echo json_encode($data);
die();
