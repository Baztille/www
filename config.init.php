<?php

  /**
  * config.init.php
  *
  * @author Grégory Isabelli <gisabelli@gmail.com>
  * @copyright Grégory Isabelli <gisabelli@gmail.com>
  * @package Core
  *
  *
  * Main application configuration file: default value
  * (note: default value are most common value used in PRODUCTION environnement)
  */

$g_config = array();

$g_config['silex_autoload_location'] =  '/var/vendor/autoload.php';



////////// Logs & error configuration //////////////

$g_config['error_reporting_level'] = ( E_ALL | E_STRICT ) & ~E_DEPRECATED;
error_reporting( $g_config['error_reporting_level'] );
$g_config['log_level'] = 'notice';  // Note: info for dev, notice for production


////////// Application paths and URLs //////////////

$g_config['app_domain'] = "baztille.org";
$g_config['app_base_url'] = "http://baztille.org";
$g_config['app_website_name'] = "Baztille";


$g_config['app_webservice_url'] = 'http://ws.baztille.org';
