<?php
    if ($_POST) {
        $name = htmlspecialchars($_POST["name"]);
        $email = htmlspecialchars($_POST["email"]);
        $phone = htmlspecialchars($_POST["phone"]);
        $json = array();

        if (!$name or !$email or !$phone) {
            $json['error'] = 'Вы заполнили не все поля!';
            echo json_encode($json);
            die();
        }

        if (!preg_match("|^[-0-9a-z_\.]+@[-0-9a-z_^\.]+\.[a-z]{2,6}$|i", $email)) {
            $json['error'] = 'Не верный формат email!';
            echo json_encode($json);
            die();
        }

        if (!preg_match("|^\+?[0-9\-\s\(\)]+$|i", $phone)) {
            $json['error'] = 'Не верный формат номера телефона!';
            echo json_encode($json);
            die();
        }

        function mime_header_encode($str, $data_charset, $send_charset) { // функция преобразования заголовков в верную кодировку 
            if($data_charset != $send_charset)
            $str=iconv($data_charset,$send_charset.'//IGNORE',$str);
            return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
        }

        class TEmail {
            public $from_email;
            public $from_name;
            public $to_email;
            public $to_name;
            public $subject;
            public $data_charset='UTF-8';
            public $send_charset='windows-1251';
            public $body='';
            public $type='text/html';

            function send(){
                $dc=$this->data_charset;
                $sc=$this->send_charset;
                $enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
                $enc_subject=mime_header_encode($this->subject,$dc,$sc);
                $enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
                $enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
                $headers='';
                $headers.="Mime-Version: 1.0\r\n";
                $headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
                $headers.="From: ".$enc_from."\r\n";
                return mail($enc_to,$enc_subject,$enc_body,$headers);
            }

        }

        $mesage = 'Имя - '.$name.'<br>Электронная почта - '.$email.'<br>Телефон - '.$phone;

        $emailgo= new TEmail;
        $emailgo->from_email= $email; // от кого
        $emailgo->from_name= $name;
        $emailgo->to_email= 'i.demidov@parcsis.org'; // кому
        $emailgo->to_name= 'Демидов Илья Александрович';
        $emailgo->subject= 'Онлайн бухгалтер'; // тема
        $emailgo->body= $mesage; // сообщение
        $emailgo->send(); // отправляем

        $json['success'] = 'Заявка отправлена.';

        echo json_encode($json); // выводим массив ответа
    } else { // если массив POST не был передан
        echo 'GET LOST!';
    }
?>