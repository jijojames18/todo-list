<?php
class Todo {
    private $db;

    function __construct() {
        $this->createDatabaseConnection();
    }

    private function createDatabaseConnection() {
        $this->db = new PDO("mysql:host=localhost;dbname=". DB_NAME. ";charset=UTF8", DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    private function isValidBucket($bucketId)
    {
        $validationQuery = $this->db->prepare("SELECT `bucket_name` as `bucketName` FROM `bucket` WHERE `bucket_id` = ?");
        $validationQuery->bindParam(1, $bucketId, PDO::PARAM_STR);
        $validationQuery->execute();
        $bucket = $validationQuery->fetchAll();
        if (empty($bucket))
        {
            return false;
        }
        
        return $bucket;
    }

    public function fetchAll($bucketId) {
        $bucket = $this->isValidBucket($bucketId);
        if ($bucket === false)
        {
            return false;
        }
        
        $query = $this->db->prepare("SELECT `todo_id` as todoId, `todo_name` as `todoName`, `todo_bucket_id` as `todoBucketId`, `todo_done` as todoDone FROM `todo` WHERE `todo_bucket_id` = ? ORDER BY `todo_id` DESC");
        $query->bindParam(1, $bucketId, PDO::PARAM_STR);
        $query->execute();
        file_put_contents('test.log', print_r($bucket, true));
        return  array('todos' => $query->fetchAll(), 'bucketName' => $bucket[0]['bucketName']);
    }
    
    public function insertTodo($todoId, $todoName, $todoBucketId) {
        $query = $this->db->prepare("INSERT INTO `todo` (`todo_id`, `todo_name`, `todo_done`, `todo_bucket_id`) VALUES (?, ?, 0, ?);");
        $query->bindParam(1, $todoId, PDO::PARAM_STR);
        $query->bindParam(2, $todoName, PDO::PARAM_STR);
        $query->bindParam(3, $todoBucketId, PDO::PARAM_STR);
        return $query->execute();
    }
    
    public function deleteTodo($todoId) {
        $query = $this->db->prepare("DELETE from `todo` WHERE `todo_id` = ?;");
        $query->bindParam(1, $todoId, PDO::PARAM_STR);
        return $query->execute();
    }
    
    public function updateTodo($todoId, $todoName, $todoDone) {
        $query = $this->db->prepare("UPDATE `todo` SET todo_name=?, todo_done=? WHERE todo_id=?;");
        $query->bindParam(1, $todoName, PDO::PARAM_STR);
        $query->bindParam(2, $todoDone, PDO::PARAM_STR);
        $query->bindParam(3, $todoId, PDO::PARAM_STR);
        return $query->execute();
    }
}
