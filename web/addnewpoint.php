<?php 
function send_post($url, $post_data) {   
  
  $postdata = http_build_query($post_data);   
  $options = array(   
    'http' => array(   
      'method' => 'POST',   
      'header' => 'Content-type:application/x-www-form-urlencoded',   
      'content' => $postdata,   
      'timeout' => 15 * 60 // ��ʱʱ�䣨��λ:s��   
    )   
  );   
  $context = stream_context_create($options);   
  $result = file_get_contents($url, false, $context);   
  
  return $result;   
}   






/*
if($_POST["geotable_id"]=null)
$geotable_id="47911";
else
$geotable_id=$_POST["geotable_id"];

if($_POST["ak"]=null)
$ak="4674a004717700fd5be7173f20142683";
else 
$ak=$_POST["ak"];
*/
$base=$_REQUEST['image'];
$binary=base64_decode($base);

// binary, utf-8 bytes

header('Content-Type: bitmap; charset=utf-8');
   //��һ��:��ʼ������ 
   //microtime(); �Ǹ�����
   $seedstr =split(" ",microtime(),5); 
   $seed =$seedstr[0]*10000;   
   //�ڶ���:ʹ�����ӳ�ʼ������������� 
   srand($seed);   
   //������:����ָ����Χ�ڵ������ 
   $random =rand(1000,10000);
  
   $filename = date("YmdHis", time()).$random;
   echo  $filename;

  

$file = fopen($filename.".jpg", 'wb');

fwrite($file, $binary);

fclose($file);

/*
      move_uploaded_file($_FILES["file"]["tmp_name"],
    $filename.".jpg");
     
      */
	
//echo $_POST["geotable_id"];


$pic_url="http://112.124.0.230/web/".$filename.".jpg";
$post_data = array(   
  'latitude' => $_POST["latitude"],   
  'longitude' => $_POST["longitude"],
  'address'=> $_POST["address"],
  'title'=> $_POST["title"],
  'coord_type'=>'1',
  'geotable_id'=>$_POST["geotable_id"],
  'ak'=>$_POST["ak"],
  'weibo_pic'=>$pic_url
);   


$o=send_post('http://api.map.baidu.com/geodata/v2/poi/create', $post_data);   
 $obj=json_decode($o);
echo  $obj->status;
  //$obj->message;



?>