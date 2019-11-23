<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'bootstrap.php';
require 'vendor/autoload.php';
require 'classes/Todo.php';
require 'classes/Bucket.php';

$app = new \Slim\App;

$app->options('/v1/bucket', function (Request $request, Response $response, array $args) {
    return $response;
});

$app->get('/v1/buckets', function (Request $request, Response $response, array $args) {
    $bucket = new Bucket();
    $responseData = $bucket->fetchAll();
    if (isset($responseData))
    {
        return $response->withJson($responseData);
    }
    else
    {
        return $response->withStatus(500);
    }
});

$app->post('/v1/bucket', function (Request $request, Response $response, array $args) {
    $bucket = new Bucket();
    $parsedBody = $request->getParsedBody();
    $bucketData = isset($parsedBody['bucket']) ? $parsedBody['bucket'] : array();
    if (empty($bucketData) || !isset($bucketData['bucketId']))
    {
        return $response->withStatus(302);
    }
    
    $bucketId = escapeRequestData($bucketData['bucketId']);
    $bucketName = isset($bucketData['bucketName']) ? escapeRequestData($bucketData['bucketName']) : '';
    $bucketCreatedTime = isset($bucketData['bucketCreatedTime']) ? escapeRequestData($bucketData['bucketCreatedTime']) : '';
    if ($bucket->insertBucket($bucketId, $bucketName, $bucketCreatedTime))
    {
        return $response->withJson(array('message' => 'ok'));
    }
    else
    {
        return $response->withJson(array('message' => 'error'))->withStatus(500);
    }
});


$app->get('/v1/todos/{bucketId}', function (Request $request, Response $response, array $args) {
    $todo = new Todo();
    $bucketId = escapeRequestData($args['bucketId']);
    $responseData = $todo->fetchAll($bucketId);
    if ($responseData !== false)
    {
        return $response->withJson($responseData);
    }
    else
    {
        return $response->withStatus(404);
    }
});

$app->post('/v1/todo', function (Request $request, Response $response, array $args) {
    $todo = new Todo();
    $parsedBody = $request->getParsedBody();
    $todoData = isset($parsedBody['todo']) ? $parsedBody['todo'] : array();
    if (empty($todoData) || !isset($todoData['todoBucketId']) || !isset($todoData['todoId']))
    {
        return $response->withStatus(302);
    }
    
    $todoId = escapeRequestData($todoData['todoId']);
    $todoName = isset($todoData['todoName']) ? escapeRequestData($todoData['todoName']) : '';
    $todoBucketId = escapeRequestData($todoData['todoBucketId']);
    $todoCreatedTime = isset($todoData['todoCreatedTime']) ? escapeRequestData($todoData['todoCreatedTime']) : '';
    if ($todo->insertTodo($todoId, $todoName, $todoBucketId, $todoCreatedTime))
    {
        return $response->withJson(array('message' => 'ok'));
    }
    else
    {
        return $response->withJson(array('message' => 'error'))->withStatus(500);
    }
});

$app->delete('/v1/todo/{todoId}', function (Request $request, Response $response, array $args) {
    $todo = new Todo();
    $todoId = escapeRequestData($args['todoId']);;
    if ($todo->deleteTodo($todoId))
    {
        return $response->withJson(array('message' => 'ok'));
    }
    else
    {
        return $response->withStatus(500);
    }
});

$app->patch('/v1/todo', function (Request $request, Response $response, array $args) {
    $todo = new Todo();
    $parsedBody = $request->getParsedBody();
    $todoData = isset($parsedBody['todo']) ? $parsedBody['todo'] : array();
    if (empty($todoData) || !isset($todoData['todoId']))
    {
        return $response->withStatus(302);
    }
    
    $todoId = escapeRequestData($todoData['todoId']);
    $todoName = isset($todoData['todoName']) ? escapeRequestData($todoData['todoName']) : '';
    $todoDone = isset($todoData['todoDone']) ? escapeRequestData($todoData['todoDone']) : '';
    if ($todo->updateTodo($todoId, $todoName, $todoDone))
    {
        return $response->withJson(array('message' => 'ok'));
    }
    else
    {
        return $response->withJson(array('message' => 'error'))->withStatus(500);
    }
});

$app->run();

function escapeRequestData ($data) {
    $data = stripslashes($data);
    $data = htmlentities($data);
    $data = strip_tags($data);
    return $data;
}