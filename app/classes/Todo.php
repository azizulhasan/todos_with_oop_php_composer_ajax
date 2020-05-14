<?php
namespace App\classes;
class Todo{
	private $con;
	public $file;
	public $id;
	public $err;
	function __construct(Type $foo = null){
        $con= mysqli_connect('localhost', 'root', '', 'wedevs_todo');
        $this->con = $con;
        

	}


	private function ES($data){
           return $this->con->real_escape_string($data);
	}

	public function Insert($table, $data)
	{
		$sql = "";
		foreach ($data as $key => $value) {
			if(!$sql == ""){
				$sql .= ", ";
			}
			$sql.="$key= '".$value."'";
		}
		 $query="insert into {$table}  set $sql ;";


		if ($result = $this->con->query($query) === TRUE) {
			$this->id = $this->con->insert_id;
			// echo $query;
			return $this->id;
		} else {
		     // echo $query;
			return  $this->err;

		}



	}


	

	public function ReadTodo($data, $table,  $where=null,   $orders=null, $relations = null){


		$query="select {$data} from {$table} ";
		$tmp_order = "";
		$tmp_where = "";
		$tmp_rel = "";

		if(!empty($where)){
			foreach($where as $where_i=>$where_value){
				if(!$tmp_where == "") {
					$tmp_where .= " && ";
				}
				else {
					$tmp_where .= "where ";
				}
				$tmp_where .= "{$where_i}='".$where_value."' ";
			}
		}
		$query .= $tmp_where;

		if(!empty($orders)){
			foreach($orders as $orderBy=>$order_value){
				if(!$tmp_order == "") {
					$tmp_order .= " ,";
				}
				else {
					$tmp_order .= " order by ";
				}
				$tmp_order .= " {$orderBy} {$order_value} ";
			}
		}
		$query .= $tmp_order;

		if (!empty($relations)) {
			foreach ($relations as $relation_i => $relation_v) {
				if ($tmp_rel) {
					$tmp_rel .=" and ";
				}
				else{
					$tmp_rel .=" where ";
				}
				$tmp_rel .="{$relation_i} = ".$relation_v;
			}
		}
		$query .= $tmp_rel;
		return $this->con->query($query);
	}


	public function UpdateTodo($table, $arr, $where) {
	  $str = "";
	  foreach ($arr as $key => $value) {
	    if ($str) {
	      $str .= ", ";
	    }
	    $str .= "$key='" . $this->ES($value) . "'";
	  }

	  $str2="";
	  if ($where) {
	    foreach ($where as $key => $value) {
	      if ($str2) {
	        $str2 .= " and ";
	      }
	      $str2 .= "$key='" . $this->ES($value) . "'";
	    }
	    if ($str2) {
	      $str2 = " where " . $str2;
	    }
	  }

	  $str = "update $table set " . $str . $str2;

	//   echo $str;

	 if ( $this->con->query($str) === TRUE) {
			return true;
		} else {
		    return false;

		}
	}

	public function DeleteTodo($table, $id){
	  $sql = "delete from $table where id='".$this->ES($id)."'";
	  $sql = $this->con->query($sql);
	  if($this->con->affected_rows > 0){
	    return TRUE;
	  }
	  return FALSE;
	}
	
}
