# todos

# Todos List App With PHP , Composer And Ajax

Todos is a simple todo list app made with OOP PHP, MySQL , jQuery and Ajax.

## Installation:

- Import sql file (wedevs_todo.sql) to your database.
- Database is in (database) folder.
- Define Your project url without last slash (/) sing in custom.js file which is located (assets/js) folder.
- Change database info in (app/classes/Todo.php) in constructor function.

```php
// Change your db name with your Database name.
$con= mysqli_connect('localhost', 'username', 'pasword', 'database_name');
```

## Features:

- Add Tasks.
- Edit Tasks.
- Delete Single Tasks.
- Delete Bulk Tasks.
- Mark Tasks as Finished.
- Filter Completed Tasks.
- Filter Active Tasks.
- Filter Active and Completed Tasks.
- ...

### Enjoy!
