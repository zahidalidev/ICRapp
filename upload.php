<?php

 $file = time(). "_" . basename($_FILES['img']['name']);

 $tmp_name = $_FILES['img']['tmp_name'];

if(move_uploaded_file($tmp_name,"images/".$file)){
  echo json_encode([
    "Message" => "The file has been uploaded",
    "Status" => "OK"
    ]);
}else{
  echo json_encode([
    "Message" => "sorry",
    "Status" => "Error"
    ]);
}



 ?>