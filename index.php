<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App With PHP , Composer and AJAX</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/custom.css">
</head>
<body>
        <div class="container">
            <div class="row">
                <div class="col-sm-12  offset-md-2 offset-lg-3 col-md-7 todo_item_box">
                <h1 class="text-center ">todos</h1>
                    <div class="row mx-3 mx-sm-0" id="todo_item">
                    <input class="form-control-lg py-4  col-12 "  type="text" id="title" name="title" placeholder=" What you needs to be done today ?">
                </div>
                <div class="row mx-3 mx-sm-0 todo_body">
                </div>
                <div class="row mx-3 mx-sm-0">
                <div id="show_hide" class="col-12 todo_menu">
                        <div class="row">
                            <div class="col-3 pl-4" id="count_div">
                            </div>
                            <div class="col-1 active_color">
                                <button type="button"  class="all_task " >All</button>
                            </div>
                            <div class="col-2">
                                <button type="button"  class="all_active_task" >Active</button>
                            </div>
                            <div class="col-2" >
                                <button type="button"  class="all_complete_task" >Completed</button>
                            </div>
                            <div class="col-4">
                                <button type="button"  class="clear_completed_task" >Clear Completed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" ></script> 
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" ></script>
    <script src="assets/js/custom.js"></script>
</body>
</html>