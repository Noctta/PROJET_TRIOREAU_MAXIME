<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/vendor/autoload.php';
$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(false, true, true);

const JWT_SECRET = "makey1234567";


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/hello", "/api/hello", "/api/login", "/api/createUser"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];


// function options(Request $request, Response $response)
// {
//     // Evite que le front demande une confirmation à chaque modification
//     $response = $response->withHeader("Access-Control-Max-Age", 60);

//     return addHeaders($response, $request->getHeader('Origin'));
// }

// $app->options('/api/*', function ($request, $response) {
//     return options($request, $response);
// });

$app->post('/api/login', function (Request $request, Response $response, $args) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 60000;
    $payload = array(
        'userid' => "12345",
        'email' => "maxime@gmail.com",
        'pseudo' => "maxou",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $response = addCorsHeaders($response);
    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
});


$app->get('/api/client/{id}', function (Request $request, Response $response, $args) {
    $array = [];
    $array["nom"] = "trioreau";
    $array["prenom"] = "maxime";

    $response = addCorsHeaders($response);
    $response->getBody()->write(json_encode($array));
    return $response;
});

$app->get('/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array["nom"] = $args['name'];

    $response = addCorsHeaders($response);
    $response->getBody()->write(json_encode($array));
    return $response;
});


$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array["nom"] = $args['name'];

    $response = addCorsHeaders($response);
    $response->getBody()->write(json_encode($array));
    return $response;
});

$app->get('/api/catalogue', function (Request $request, Response $response, $args) {
    $flux = '[
        {
            "id": 1,
            "brand": "MSR",
            "name": "Msr Hubba Hubba NX",
            "price": "400",
            "capacity": "1",
            "image": "" 
        },
        {
            "id": 2,
            "brand": "Zpack",
            "name": "Zpack Duplex",
            "price": "600",
            "capacity": "2",
            "image": "" 
        },
        {
            "id": 3,
            "brand": "Forclaz",
            "name": "Forclaz trek 900",
            "price": "130",
            "capacity": "1",
            "image": "" 
        }
    ]';

    $response = $response
        ->withHeader("Content-Type", "application/json;charset=utf-8");

    $response = addCorsHeaders($response);
    $response->getBody()->write($flux);
    return $response;
});

function addCorsHeaders(Response $response): Response
{

    $response =  $response
        ->withHeader("Access-Control-Allow-Origin", 'https://nfe-php.herokuapp.com')
        // ->withHeader("Access-Control-Allow-Origin", 'http://localhost')
        ->withHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization')
        ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
        ->withHeader("Access-Control-Expose-Headers", "Authorization");

    return $response;
}

// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run();
