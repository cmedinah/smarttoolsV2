"use strict";
const db   			= 	require('./database'), 
	  bcrypt    	= 	require('bcrypt-nodejs'), 
	  passport 		= 	require('passport'), 
	  concurso		=	require('./concurso'),
	  videos		=	require('./videos');	 
	  db.conectaDatabase();
//Vista Principal...
let index = (req, res) => 
{
	res.render("index", {
		titulo 	:  	"SmartTools"
	});
};

let admin = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
    else
    {
		//console.log(req.user.identificacion);
        //var user = req.user;
		res.render("admin", { 
			data	:  req.user
		});
    }
}

let adminvideos = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
    else
    {
		//console.log(req.user);
        //var user = req.user;
		res.render("adminvideos", { 
			data	:  req.user
		});
    }
}

let login = (req, res) => 
{
	if(!req.isAuthenticated())
	{
		res.render("login", {
			titulo 	:  	"SmartTools"
		});
	}
	else
	{
		console.log("INGRESA PARA IR AL ADMIN");
		res.redirect('/admin');
	}
};

let register = (req, res) => 
{
	res.render("register", {
		titulo 	:  	"SmartTools"
	});
};

let registerPost = (req, res, next) => 
{
	let data = req.body, 
		sql  = `select count(*) as numero from administrador_empresa 
				where identificacion = '${data.identificacion}' or 
					  email = '${data.email}'`;
	db.queryMysql(sql, (err, response) => 
	{
		//console.log(response);
		if(response[0].numero !== 0)
		{
			res.json({error : true, msg : "Ya existe un usuario con estos datos"});
		}
		else
		{
			//Validar la fecha...
			let password 	= bcrypt.hashSync(data.password), 
				date     	= new Date(), 
				fecha 		= `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, 
				sql 		= `INSERT INTO administrador_empresa (estado, identificacion, nombres, apellidos, email, password, nombre_empresa, fecha) 
							   VALUES ('1', '${data.identificacion}', '${data.nombres}', '${data.apellidos}', '${data.email}', '${password}', '${data.empresa}', '${fecha}')`;
			//console.log(sql);
			db.queryMysql(sql, (err, response) => 
			{
				if (err || response.affectedRows === 0)
				{
					res.render('register');
				}
				res.json({error : false});
			});
		}
	});
};

let logout = (req, res) => 
{
	if(req.isAuthenticated())
	{
		req.logout();
    }
	res.redirect('/login');
}

//Para realizar la autenticación...
let loginPost = (req, res, next) => 
{
	passport.authenticate('local', {successRedirect: '/admin', failureRedirect: '/login'},
	(err, user, info) => 
	{
		if(err)
		{
			return res.render('login', {titulo: 'SmartTools', error: err.message});
		}
		if(!user)
		{
			return res.render('login', {titulo: 'SmartTools', error: info.message, usuario : info.usuario});
		}
		return req.logIn(user, (err) => 
		{
			if(err)
			{
				return res.render('login', {titulo: 'SmartTools', error: err.message});
			}
			else
			{
				return res.redirect('/admin');
			}
		});
	})(req, res, next);
};

//Para crear un nuevo concurso...
let newConcurso = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
    else
    {
		//console.log(req.params.id);
		if(req.params.id !== "0")
		{
			//console.log("INGRESA A ESTE PUNTO");
			concurso.getConcurso(1, req.params.id, (err, concurso, rango) =>
			{
				//console.log(concurso.length);
				if(!err)
				{
					res.render("newconcurso", {data	: req.user, concurso : concurso[0], rango : rango});
				}
				else
				{
					res.redirect('/login');
				}
			});
		}
		else
		{
			//console.log("INGRESA A ESTE SEGUNDO PUNTO");
			res.render("newconcurso", { 
				data		:  req.user, 
				concurso	: {}
			});
		}
    }
};

//Para crear un nuevo concurso...
let newConcursoPost = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.json({error : true});
    }
    else
    {
		concurso.crearConcurso(req, (err, data) => 
		{
			//console.log("Guarda");
			res.json({err, data});
			//res.redirect('/admin');
			/*
			if(err)
			{
				res.status(data).send("Error en el proceso");
			}
			res.send('Proceso realizado');
			*/
		});
    }
};

let numConcurso = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
	else
	{
		concurso.totalRegistrosConcurso(req.user.idadministrador, (err, data) => 
		{
			/*
			if(err)
			{
				res.status(data).send("Error en el proceso");
			}
			*/
			res.json(data);
		});
	}
};

let listarConcursos = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
	else
	{
		concurso.listarConcursos(req, (err, data) => 
		{
			/*
			if(err)
			{
				res.status(data).send("Error en el proceso");
			}
			*/
			res.json(data);
		});
	}
};

let eliminaConcurso  = (req, res) => 
{
	if(!req.isAuthenticated())
    {
        res.json({error: true, data : "No está autenticado"});
    }
	else
	{
		concurso.eliminaConcurso(req.params.token, (err, data) => 
		{
			res.json({error : err, data});
		});
	}
};

let eliminarvideo  = (req, res) => 
{
	
	if(!req.isAuthenticated())
    {        
        res.json({error: true, data : "No est√° autenticado"});
    }
	else
	{
	
		videos.eliminarvideo(req.params.idVideo, (err, data) => 
		{
			res.json({error:false, data});
		});
	}
};

let showConcurso = (req, res) => 
{
	//console.log(req.params.new);
	concurso.getConcurso(2, req.params.url, (err, concurso, rango) =>
	{
		if(!err)
		{
			//console.log("PARA SABER SI ESTÁ EN EL RANGO", rango);			
			//console.log({concurso : concurso[0], rango});
			res.render("concurso", {concurso : concurso[0], rango : rango});			
		}
		else
		{
			notFound404(req, res);
		}
	});
};

//Para crear un nuevo vídeo...
let vistaConcursoVideo = (req, res) => 
{
	let template = "";
	if(req.params.accion === "new" || req.params.accion === "rules")
	{
		template = req.params.accion === "new" ? "newvideo" : "rules";
	}
	else
	{
		template = "video";
	}
	//console.log(req.params.accion);
	//res.render("newvideo");
	concurso.getConcurso(2, req.params.url, (err, concurso, rango) =>
	{
		if(!err)
		{
			if(template !== "video")
			{
				res.render(template, {concurso : concurso[0], rango : rango});
			}
			else
			{
				//Se debe buscar los datos del vídeo...
				videos.getVideo(req.params.accion, (error, video) =>
				{
					if(video)
					{
						res.render(template, {concurso : concurso[0], video, rango : rango});
					}
					else
					{
						notFound404(req, res);
					}
				});
			}
		}
		else
		{
			notFound404(req, res);
		}
	});
};

let newVideoPost = (req, res) => 
{
	videos.newVideo(req, (error, data) => 
	{
		//console.log("Guarda el vídeo...");
		res.json({error, data});
		//res.redirect(`/${req.body.url}`);
		/*
		if(err)
		{
			res.status(data).send("Error en el proceso");
		}
		res.send('Proceso realizado');
		*/
	});
};

let numeroVideos = (req, res) => 
{
	//console.log("LLega a este punto DE LA PETECIÓN...");
	videos.totalRegistrosVideos(req.params.token, (err, data) => 
	{
		res.json(data);
	});
};

let numeroVideosAdmin = (req, res) => 
{
	//console.log("LLega a este punto DE LA PETECI√ìN...");
	videos.totalRegistrosVideosAdmin(req.params.idAdmin, (err, data) => 
	{

		res.json(data);
	});
};

let listadoVideos = (req, res) => 
{
	videos.listadoVideos(req, (err, data) => 
	{
		res.json(data);
	});
};

let listadoVideosAdmin = (req, res) => 
{
	videos.listadoVideosAdmin(req, (err, data) => 
	{
		res.json(data);
	});
};


let notFound404 = (req, res) => 
{
	res.status(404).send("Página no encontrada :( en el momento");
};

//Exportar las rutas...
module.exports.index = index;
module.exports.admin = admin;
module.exports.adminvideos = adminvideos;
module.exports.login = login;
module.exports.logout = logout;
module.exports.register = register;
module.exports.registerPost = registerPost;
module.exports.loginPost = loginPost;
//Para el concurso...
module.exports.newConcurso = newConcurso;
module.exports.newConcursoPost = newConcursoPost;
module.exports.numConcurso = numConcurso;
module.exports.listarConcursos = listarConcursos;
module.exports.eliminaConcurso = eliminaConcurso;
module.exports.showConcurso = showConcurso;
module.exports.notFound404 = notFound404;
//Para el proceso de los vídeo...
module.exports.vistaConcursoVideo = vistaConcursoVideo;
module.exports.newVideoPost = newVideoPost;
module.exports.numeroVideos = numeroVideos;
module.exports.numeroVideosAdmin = numeroVideosAdmin;
module.exports.listadoVideos = listadoVideos;
module.exports.listadoVideosAdmin = listadoVideosAdmin;
module.exports.eliminarvideo = eliminarvideo;