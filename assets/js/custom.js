/*
  Your project url without last slash (/) sing. 
  default http://localhost
*/
var project_url = "http://localhost/php/todo";

$(document).ready(function () {
  $(function () {
    /************************************************
    |
    | Load Todos
    |
    *************************************************/
    function loadData() {
      $.get({
        url: project_url + "/api/todoLoad.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
          const result = data.map((singleData) => {
            return `
              <div class="col-12 active_task single_row" serial="${singleData.id}">
              <div class="row">
                    <div class="col-1">
                        <label class="control control--checkbox">
                        <input  type="checkbox" name="completed" data-id="${singleData.id}" id="completed"  >
                        <div class="control__indicator"></div>
                        </label>
                    </div>
                        <div class="col-10" id="edit_todo" >
                            <p id="edit_text"  data-id="${singleData.id}">${singleData.title}</p>
                            <div class="form-group">
                            <input data-id="${singleData.id}" class="form-control show_input_field" type="text" name="title"  id="edit_title" value="${singleData.title}"  >
                            </div>
                        </div>
                        <div class="col-1">
                            <button type="button" data-id="${singleData.id}" class="delete_todo" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                         </div>
                    </div>
                </div>
              `;
          });
          $(".todo_item_box div.todo_body").append(result);
          let itemLeft = $(".todo_item_box div.todo_body div.active_task")
            .length;
          count_div_item(itemLeft, "left");
        },
        error: function (data) {
          console.log("Error:", data);
          $("#btn").html("Save Changes");
        },
      });
    }
    loadData();
    /************************************************
    |
    | Add todos
    |
    *************************************************/
    $("#title").keydown(function (e) {
      var key = e.which;
      if (key == 13) {
        $.ajax({
          data: { title: $(this).val() },
          url: project_url + "/api/todoAdd.php",
          type: "POST",
          dataType: "json",
          success: function (singleData) {
            $("#title").val("");
            console.log(singleData[0].id);
            html = "";
            html += `
              <div class="col-12 active_task single_row" serial="${singleData[0].id}">
              <div class="row">
                    <div class="col-1">
                        <label class="control control--checkbox">
                        <input data-id="${singleData[0].id}" type="checkbox" name="completed" id="completed"  >
                        <div class="control__indicator"></div>
                        </label>
                    </div>
                        <div class="col-10" id="edit_todo" >
                            <p id="edit_text"  data-id="${singleData[0].id}">${singleData[0].title}</p>
                            <div class="form-group">
                            <input data-id="${singleData[0].id}" class="form-control show_input_field" type="text" name="title"  id="edit_title" value="${singleData[0].title}"  >
                            </div>
                        </div>
                        <div class="col-1">
                            <button type="button" data-id="${singleData[0].id}" class="delete_todo" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                         </div>
                    </div>
                </div>
              `;
            $(".todo_item_box div.todo_body").append(html);
            let itemLeft = $(".todo_item_box div.todo_body div.active_task")
              .length;
            count_div_item(itemLeft, "left");
          },
        });
      }
    });
    /************************************************
    |
    | Edit Todo
    |
    *************************************************/
    $(".todo_item_box").on("keydown", "#edit_title", function (e) {
      var todo_id = $(this).data("id");
      var p_text = $(this).closest("div.single_row").find("#edit_text");
      var edited_title = $(this);
      $(edited_title).show();
      var key = e.which;
      if (key == 13) {
        $.ajax({
          data: {
            id: todo_id,
            title: $(this).val(),
          },
          url: project_url + "/api/todoEdit.php",
          type: "POST",
          dataType: "json",
          success: function (data) {
            $(edited_title).val(data[0].title);
            $(edited_title).addClass("show_input_field");
            $(p_text).text(data[0].title);
            $(p_text).show();
          },
          error: function (data) {
            console.log("Error:", data);
          },
        });
      }
    });
    /************************************************
    |
    | Delet a single todo
    |
    *************************************************/
    $(".todo_item_box").on("click", ".delete_todo ", function (e) {
      var todo_id = $(this).data("id");
      console.log(todo_id);
      var singleTask = $(this).closest("div.single_row");
      $.ajax({
        type: "POST",
        data: {
          id: todo_id,
        },
        dataType: "json",
        url: project_url + "/api/todoDelete.php",
        success: function (data) {
          if (data.status == 1) {
            let itemLeft = $(".todo_item_box div.todo_body div.active_task")
              .length;
            count_div_item(itemLeft - 1, "left");
            $(singleTask).remove();
          }
        },
        error: function (data) {
          console.log("Error:", data);
        },
      });
    });
    /************************************************
    |
    | clear all todos from front and database
    |
    *************************************************/
    $(".clear_completed_task").on("click", function () {
      var completed_task = $(".completed_task");
      $.ajax({
        data: { id: com_id },
        url: project_url + "/api/todoDeleteAll.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
          if (data) {
            $(completed_task).remove();
            let itemLeft = $(
              ".todo_item_box div.todo_body div.all_complete_task"
            ).length;
            count_div_item(itemLeft, "left");
            if (itemLeft) {
              $(".clear_completed_task").css("visibility", "visible");
            } else {
              $(".clear_completed_task").css("visibility", "hidden");
            }
          }
        },
        error: function (data) {
          alert("Error:", data);
        },
      });
    });
    /************************************************
    |
    | Show edit form after clicking on todo text 
    |
    *************************************************/
    $(".todo_item_box").on("click", "#edit_text", function () {
      $(this).closest("div.single_row").find("#edit_text").hide();
      $(this)
        .closest("div.single_row")
        .find("#edit_title")
        .removeClass("show_input_field");
      $(this).closest("div.single_row").find("#edit_title").focus();
    });
    /************************************************
    |
    | View all atcive task 
    |
    *************************************************/
    $(".all_active_task").on("click", function () {
      $(".active_task").show();
      $(".completed_task").hide();
      let itemLeft = $(".todo_item_box div.todo_body div.active_task").length;
      count_div_item(itemLeft, "active");
    });
    /************************************************
    |
    | Complete task and add it to copleted task button
    |
    *************************************************/
    var com_id = new Array();
    $(".todo_item_box").on("click", "#completed", function () {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $(this).closest("div.single_row").find("p").wrap("<del></del>");
        $(this).closest("div.single_row").removeClass("active_task");
        $(this).closest("div.single_row").addClass("completed_task");
        com_id.push($(this).closest("div.single_row").attr("serial"));
        let itemLeft = $(".todo_item_box div.todo_body div.active_task").length;
        count_div_item(itemLeft, "left");
        itemLeft > 0 || itemLeft == 0
          ? $(".clear_completed_task").css("visibility", "visible")
          : $(".clear_completed_task").css("visibility", "hidden");
      } else {
        $(this).closest("div.single_row").find("p").unwrap("del");
        $(this).closest("div.single_row").removeClass("completed_task");
        $(this).closest("div.single_row").addClass("active_task");
        let itemLeft = $(".todo_item_box div.todo_body div.completed_task")
          .length;
        count_div_item(itemLeft, "left");
        itemLeft > 0
          ? $(".clear_completed_task").css("visibility", "visible")
          : $(".clear_completed_task").css("visibility", "hidden");
        $(this).removeClass("active");
      }
    });
    /************************************************
    |
    | View all complete task
    |
    *************************************************/
    $(".all_complete_task").on("click", function () {
      if ($(this).closest("div.single_row").hasClass("active_task")) {
        $(".active_task").hide();
        $(".completed_task").show();
      } else {
        $(".active_task").hide();
        $(".completed_task").show();
      }
      let itemLeft = $(".todo_item_box div.todo_body div.completed_task")
        .length;
      count_div_item(itemLeft, "completed");
    });
    /************************************************
    |
    | View all  task
    |
    *************************************************/
    $(".all_task").on("click", function () {
      $(".active_task").show();
      $(".completed_task").show();
      let itemLeft = $(".todo_item_box div.todo_body div.single_row").length;
      count_div_item(itemLeft, "");
    });
    /************************************************
    |
    | Show bottom row after adding todos
    |
    *************************************************/
    $("#show_hide div.row [class*='col-']").click(function () {
      if (!$("#show_hide div.row [class*='col-']").hasClass("active_color")) {
        $(this).addClass("active_color");
      } else {
        $("#show_hide div.row [class*='col-']").removeClass("active_color");
        $(this).addClass("active_color");
      }
    });
    /************************************************
    |
    | Count active todos
    |
    *************************************************/
    function count_div_item(itemLeft, sdiving) {
      if (itemLeft) {
        $("#show_hide").css("display", "block");
        $("#count_div").html(itemLeft + " item " + sdiving);
      } else {
        $("#count_div").html(0 + " item " + sdiving);
      }
    }
    let itemLeft = $(".todo_item_box div.todo_body div.active_task").length;
    count_div_item(itemLeft, "left");
  });
});
