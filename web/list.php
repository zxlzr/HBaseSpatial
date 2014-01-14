<?php

$d=dir(".");
echo $d->path.$e;
while(false !== ($e= $d->read())) {
    echo "http://112.124.0.230/web/$e"."<br>";
    }
$d->close();
?>