<?php

use Igorw\Middleware\Stack;
use Symfony\Component\HttpFoundation\Request;


// Default configuration
require_once 'config.init.php';

// Actual configuration
require_once '/var/baztille-data/config/config.php';

// Require Silex
require_once $g_config['silex_autoload_location'];


require_once 'version.php';


$app = new Silex\Application();

$app['debug'] = false;

///////////////// Service routing /////////////////////////////

$app->get('/', function( ) use ($app) {
    return file_get_contents( 'landing/index.html' );
} );

$app->get('/confirm', function( ) use ($app) {
    return file_get_contents( 'landing/confirm.html' );
} );
$app->get('/thankyou', function( ) use ($app) {
    return file_get_contents( 'landing/thankyou.html' );
} );

$app->get('/faq', function( ) use ($app) {
    return file_get_contents( 'landing/faq.html' );
} );

$app->get('/template', function( ) use ($app) {
    return file_get_contents( 'landing/elements.html' );
} );

$app->register(new Silex\Provider\SessionServiceProvider(), array(
'session.storage.options' => array('cookie_domain' => $g_config['app_domain'] ),
));
$app->run();
