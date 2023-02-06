<?php
// Получение данных с формы:
$name = htmlspecialchars($_POST['firstName']);
$email = htmlspecialchars($_POST['email']);
$tel = htmlspecialchars($_POST['phoneNumber']);
$massage = htmlspecialchars($_POST['massage']);
$checkbox = is_array($_POST['checkBox']) ? $_POST['checkBox'] : array();
$checkbox = implode(', ', $checkbox);
$radioBtn = htmlspecialchars($_POST['radio']);

// Параметры для функции mail:
$source = getenv('HTTP_REFERER');
$subject = 'Тема письма клиенту';
$message = "Текст письма:
        <br><br>
        Имя: $name<br>
        E-mail: $email<br>
        Телефон: $tel<br>
	    Сообщение: $massage<br>
        Чек-бокс: $checkbox<br>
        Радио: $radioBtn<br>
        Источник (ссылка): $source
    ";
$headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/html; charset=utf-8\r\n";

// Отправка данных на почту:
$success = mail("kostja-kot@mai.ru", $subject, $message, $headers);

// Сохранение инфо о лидах в файл leads.xls :

$date = date("d.m.y"); // число.месяц.год  
$time = date("H:i"); // часы:минуты:секунды

$f = fopen("leads.xls", "a+");
fwrite($f, " <tr>");
fwrite($f, " <td>$email</td> <td>$name</td> <td>$tel</td>");
fwrite($f, " <td>$source</td>");
fwrite($f, " </tr>");
fwrite($f, "\n ");
fclose($f);
