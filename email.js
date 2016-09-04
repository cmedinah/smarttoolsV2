"use strict";
const nodemailer	= require('nodemailer'), 
	  urlencode  	= require('urlencode'),
	  moment        = require('moment'), 
	  fs 		 	= require('fs'),
	  config 	 	= JSON.parse(fs.readFileSync('config.json', 'utf8')), 
	  cadenaSMTP 	= `smtps://${urlencode(config.mail.user)}:${config.mail.password}@smtp.gmail.com`, 
	  transporter 	= nodemailer.createTransport(cadenaSMTP),
	  db         	= require('./modules/database'), 
	  procesados    = [];
	  db.conectaDatabase();

//Traer los emails que se enviarán...
let sql = `select a.idvideo, a.token_video, a.idconcurso, a.error_conversion, 
				  a.duracion_string, a.titulo_video, a.nombre_usuario, a.email, 
				  a.fecha_publica_string, a.hora_publica, 
				  b.nombre_concurso, b.url_concurso
				  from concursos_videos a, 
				 	   concursos b
				  where a.estado_video = 3 and 
				 		a.email_enviado = 0 and 
				 		a.estado = 1 and 
				 		a.error_conversion = 0 and 
				 		b.idconcurso = a.idconcurso and 
				 		b.estado = 1 order by a.fecha_publica limit 0, 20`;
db.queryMysql(sql, (err, data) => 
{
	if(data.length !== 0)
	{
		console.log(`E-mail 0 de ${data.length}`);
		for(let i = 0; i < data.length; i++)
		{
			procesados.push({
                                idvideo : data[i].idvideo, 
                                terminado : false
                            });
			enviarEmail(data[i], (err, video) => 
			{
				actualizaEstadoEnvio(video, (err, video) => 
				{
					terminaDeProcesarEmail(video.idvideo);
				});				
			});
		}
	}	
	else
	{
		db.closeConection();
	}
});

//Para cambiar el estado a terminado...
let terminaDeProcesarEmail = (idvideo) => 
{
	let total = 0;
    for(let contador = 1; contador <= 2; contador++)
    {
        for(let i = 0; i < procesados.length; i++)
        {
            if(contador === 1)
            {
                if(procesados[i].idvideo === idvideo)
                {
                    procesados[i].terminado = true;
                    break; 
                }
            }
            else
            {
                if(procesados[i].terminado)
                {
                    total++;
                }
            }
        }
    }
    console.log(`E-mail ${total} de ${procesados.length}`);
    if(total === procesados.length)
    {        
        db.closeConection();
    }
};


let actualizaEstadoEnvio = (video, callback) => 
{
	let fecha  = {
                        envia_email   : moment().format(),
                        envia_email_string : moment().format("DD/MM/YYYY"),
                        timestamp   : moment().unix()
                    };
    //Setencia para actualizar...
    let sql = `UPDATE concursos_videos 
    		   SET email_enviado = '1', 
    		   	   fecha_envia_email = '${fecha.envia_email}', 
    		   	   fecha_envia_email_string = '${fecha.envia_email_string}', 
    		   	   fecha_envia_email_timestamp = '${fecha.timestamp}' 
    		   	   WHERE idvideo = ${video.idvideo}`;    
    db.queryMysql(sql, (err, data) => 
    {
        callback(true, video);
    });
};

//Para enviar el email...
let enviarEmail = (datosEmail, callback) => 
{	
	let urls = {
					video : `${config.sitio.url}/${datosEmail.url_concurso}/${datosEmail.token_video}`, 
					concurso : `${config.sitio.url}/${datosEmail.url_concurso}`
			   };	
	let mensaje = `<!DOCTYPE html>
					<html lang='en'>
					<head>
                        <meta charset='UTF-8'>
                        <title>SmartTools</title>
                    </head>
                    <body>
                    <center>
                    	<font face='Arial, Helvetica, sans-serif'>
                        	<table border='0' cellspacing='0' cellpadding='0' width='600'>
                            <tr>
                                <td><p align='center'>&nbsp;</p></td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <center>
                                            <img border='0' src='https://dl.dropboxusercontent.com/u/181689/smarttools.jpg?a=1'>
                                        </center>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                	<p>
                                		<center>
                                			<strong><br>
                                				<font face='Arial, Helvetica, sans-serif'>
                                					TÚ VÍDEO YA ESTÁ DISPONIBLE
                                				</font>
                                			</strong>
                                		</center>
                                	</p>
                                    <p align='justify'>
                                    	<font face='Arial, Helvetica, sans-serif'>
	                                    	Hola ${datosEmail.nombre_usuario}, 
	                                    	el presente correo tiene como fin comunicarte que ha finalizado 
	                                    	el procesamiento del vídeo 
	                                    	<b>${datosEmail.titulo_video}</b>
	                                    	, que has subido en el concurso 
	                                    	<b><a href = '${urls.concurso}'>${datosEmail.nombre_concurso}</a></b>
                                    	</font>.<br><br>
                                    </p>
                                  <center>
                                    <table border = '0' cellspacing='0' cellpadding='0'>
                                            <tr>
                                                <td align='center' style='-webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;' bgcolor='#F44336'><a href='${urls.video}' target='_blank' style='font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; padding: 12px 18px; border: 1px solid #F44336; display: inline-block;'>VER TÚ VÍDEO AHORA &rarr;</a></td>
                                            </tr>
                                    </table>
                                    <br>
                                  </center><hr><center>No responder a este correo, ya que ha sido enviado por un proceso automático</center></p>
                                </td>
                            </tr>
                        </table></font></center></body></html>`;
	let mailOptions = {
							from: '"SmartTools" <convertvideo@smarttools.com>',
							to: datosEmail.email, 
							subject: `${datosEmail.titulo_video} ha sido Convertido ✔`, 
							html: mensaje
					  };
	//Enviar el e-mail...
	transporter.sendMail(mailOptions, function(error, info)
	{
    	if(error)
    	{
        	return console.log(error);
    	}
    	console.log('Message sent: ' + info.response);
    	callback(error, datosEmail);
	});
};