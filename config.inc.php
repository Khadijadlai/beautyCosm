<?php
/* Server parameters */
$cfg['Servers'][1]['host'] = 'localhost'; // MySQL host
$cfg['Servers'][1]['port'] = '8000';      // MySQL port (default 3306)
$cfg['Servers'][1]['socket'] = '';        // MySQL socket path if needed
$cfg['Servers'][1]['connect_type'] = 'tcp'; // Connection type
$cfg['Servers'][1]['extension'] = 'mysqli'; // PHP extension to use
$cfg['Servers'][1]['auth_type'] = 'cookie'; // Authentication method
$cfg['Servers'][1]['user'] = 'root';      // Default user (not recommended for production)
$cfg['Servers'][1]['password'] = '';      // Default password (change this)

/* Other important settings */
$cfg['blowfish_secret'] = 'your_random_string_here'; // Needed for cookie auth
$cfg['TempDir'] = '/tmp';                // Temporary directory
$cfg['UploadDir'] = '';                  // Upload directory
$cfg['SaveDir'] = '';                    // Save directory
?>