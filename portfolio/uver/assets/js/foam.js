jQuery(document).ready(function($){
	$(document.body).addClass('o-hidden');
	var companies_block = $('.companies-block');
	companies_block.removeClass('companies-block');

	var foam_container = document.getElementById('foam_container');
	if(!foam_container || !Detector.webgl){
		return;
	}

	var doc = $(document);

	var rem = parseFloat($('html').css('font-size'));


	var width = 1920;
	var height = 1080;
	var ratio = 46;

	var start = 1285 * rem / ratio;

	var stop2 = 852 * rem / ratio;
	var offset2 = 325 * rem / ratio;


	var renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha:true,
	});
	renderer.setSize(width * rem, height * rem);
	foam_container.appendChild( renderer.domElement );

	var textures = {
		'body_balloon'	:	'assets/textures/body-balloon.png',
		'foam'			:	'assets/textures/foam256.jpg',
		'foam_lightmap'	:	'assets/textures/foam-lightmap256.jpg',
	};
	var stlModels = {
		'gun'			:	'assets/models/gun.stl',
		'metal_balloon'	:	'assets/models/metal-balloon.stl',
		'top_balloon'	:	'assets/models/top-balloon.stl',
	};

	var res = {};

	var i = function(){
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 );
		camera.position.z = 20;
		scene.add(camera);

		// Lights

		scene.add(new THREE.AmbientLight(0x666666));

		var dLight = new THREE.DirectionalLight(0xffffff, 0.6);
		dLight.position.set(-0.2,0,1);
		scene.add(dLight);

		// Groups

		var objects = new THREE.Group();
		scene.add(objects);


		var balloon = new THREE.Group();
		objects.add(balloon);

		var balloon_norm = new THREE.Group();
		balloon_norm.position.set(5.376, -3.905, 5.005);
		balloon.add(balloon_norm);

		var balloon_tremble = new THREE.Group();
		balloon_tremble.position.set(-5.376, 3.905, -5.005);
		balloon_norm.add(balloon_tremble);

		var balloon_move = new THREE.Group();
		balloon_move.scale.set(0.0363, 0.0363, 0.0363);
		balloon_move.position.set(-1.5, -5.4 + 7.3, -8.57);
		balloon_move.rotation.set(0, Math.PI / 4, 0);
		balloon_tremble.add(balloon_move);

		var balloon_rot = new THREE.Group();
		balloon_rot.rotation.set((- 156.363) / 180 * Math.PI, 0, 0);
		balloon_move.add(balloon_rot);

		var balloon_offset = new THREE.Group();
		balloon_offset.position.set(-31.624638706445694,-320.2927780151367,-78.37327671051025);
		balloon_rot.add(balloon_offset);


		var balloon2 = new THREE.Group();
		objects.add(balloon2);

		var balloon2_move = new THREE.Group();
		balloon2_move.scale.set(0.0363, 0.0363, 0.0363);
		balloon2_move.position.set(-4.2, 85 / ratio, -8.57);
		balloon2_move.rotation.set(0, 0, Math.PI / 100);
		balloon2.add(balloon2_move);

		var balloon2_rot = new THREE.Group();
		balloon2_rot.rotation.set((- 156.363) / 180 * Math.PI,0,0);
		balloon2_move.add(balloon2_rot);

		var balloon2_offset = new THREE.Group();
		balloon2_offset.position.set(-31.624638706445694,-320.2927780151367,-78.37327671051025);
		balloon2_rot.add(balloon2_offset);


		var spheres = new THREE.Group();
		spheres.position.z = -8.57;
		objects.add(spheres);

		// Materials

		var foam_mat = new THREE.MeshPhongMaterial({
			map: res.foam,
			bumpMap: res.foam_lightmap,
			bumpScale: 0.03,
			shininess: 15,
		});
		var black_mat = new THREE.MeshPhongMaterial({
			shininess: 10,
			color: 0x0,
		});
		var gray_mat = new THREE.MeshPhongMaterial({
			shininess: 30,
			color: 0x212121,
		});
		var metal_mat = new THREE.MeshStandardMaterial({
			color: 0xbcc6cc,
			shading: THREE.FlatShading,
		});
		var cover_mat = new THREE.MeshPhongMaterial({
			shininess: 200,
			map: res.body_balloon,
		});

		// Meshes

		var body_geometry = new THREE.CylinderGeometry(32,32,155.6270694916625*2,32,1,true);
		var body_mesh = new THREE.Mesh(body_geometry,cover_mat);
		body_mesh.rotation.set(0, - 3 * Math.PI / 4, 0);
		balloon_move.add(body_mesh);
		var body2_mesh = new THREE.Mesh(body_geometry,cover_mat);
		body2_mesh.rotation.set(0, - 3 * Math.PI / 4, 0);
		balloon2_move.add(body2_mesh);

		var gun_mesh = new THREE.Mesh(res.gun,gray_mat);
		balloon_offset.add(gun_mesh);

		var top_mesh = new THREE.Mesh(res.top_balloon,black_mat);
		balloon_offset.add(top_mesh);
		var top2_mesh = new THREE.Mesh(res.top_balloon,black_mat);
		balloon2_offset.add(top2_mesh);

		var metal_mesh = new THREE.Mesh(res.metal_balloon,metal_mat);
		balloon_offset.add(metal_mesh);
		var metal2_mesh = new THREE.Mesh(res.metal_balloon,metal_mat);
		balloon2_offset.add(metal2_mesh);

		// Stuff

		//var sph_geometry = new THREE.SphereGeometry( 1, 32, 32);
		//var sphere = new THREE.Mesh( sph_geometry, foam_mat );
		//spheres.add( sphere );

		var curY = 0, cur2Y = 0, nextY = start, prevY = false, maxY = 0;
		var angle = 0;

		var epsilon = 0.01;

		var sphere_arr = [];

		// Render
		var render = function () {
			requestAnimationFrame( render );

			var scrollTop = doc.scrollTop();
			var offsetY = scrollTop / ratio;

			if(offsetY != prevY){
				prevY = offsetY;

				objects.position.y = offsetY;
			}

			curY += (offsetY - curY) * 0.05;
			cur2Y += (Math.min(offsetY, stop2) - cur2Y) * 0.05;

			if(cur2Y <= stop2){
				var b2k = cur2Y / stop2;
			}else{
				var b2k = 1;
			}
			balloon2.position.y = - stop2 * b2k;
			balloon2.position.x = - b2k * offset2;
			balloon2.rotation.z = 65 * Math.PI / 1000 * b2k;

			if(curY > maxY + epsilon){
				maxY = curY;

				balloon.position.y = - maxY;

				if(maxY >= start){
					angle += 0.03;

					balloon_norm.rotation.set(0, - 0.005 * Math.cos(angle * 3) * (Math.sin(angle) + 2), 0);

					balloon_move.position.set(3.3, 8.7, 1.5);
					balloon_move.rotation.set(27 * Math.PI / 24, 22 * Math.PI / 24, -Math.PI / 24);
				}else{
					var b1k = maxY / start;
					var b1kd = 1 - b1k;

					balloon_move.position.set(-1.5 * b1kd + 3.3 * b1k, (-5.4 + 7.3) * b1kd + 8.7 * b1k, -8.57 * b1kd + 1.5 * b1k);
					balloon_move.rotation.set(27 * Math.PI / 24 * b1k, Math.PI / 4 * b1kd + 22 * Math.PI / 24 * b1k, -Math.PI / 24 * b1k);
				}

				while(maxY >= nextY){
					var sph_geometry = new THREE.SphereGeometry( (0.6 + Math.random() * 0.13) * 1.8, 16, 16, maxY);
					var sphere = new THREE.Mesh( sph_geometry, foam_mat );
					spheres.add( sphere );
					sphere.position.y = - nextY;

					sphere_arr.push({
						sphere: sphere,
						dx: (Math.random() / 2 / 2 - 1/8 + Math.cos(angle * 3) * Math.random() * 0.3) * 1.8,
						dz: (Math.random() / 2 / 2 - 1/8) * 1.8,
						sf: 0,
					});

					nextY += (0.025 + Math.random() * 0.1) * 5;
				}

				var sphere_arr_n = [];
				sphere_arr.forEach(function(el){
					var s = 1/16 + Math.pow(el.sf, 1/3);
					if(s + epsilon >= 1){
						s=1;
					}else{
						el.sf += 0.01;
						sphere_arr_n.push( el );
					}
					el.sphere.scale.set(s,s,s);
					el.sphere.position.x = s * el.dx;
					el.sphere.position.z = s * el.dz;
				});
				sphere_arr = sphere_arr_n;
			}

			renderer.render(scene, camera);
		}

		render();
	}

	var count = Object.keys(textures).length + Object.keys(stlModels).length;
	var totalCount = count;

	var preloader = $('.preloader');
	var preloader_percentage = $('#preloader_percentage');

	var l = function(id, r){
		res[id] = r;
		if(!(--count)) {
			i();

			$(document.body).removeClass('o-hidden');

			preloader.fadeToggle(1000).promise().done(function(){
				preloader.remove();

				setTimeout(function(){
					companies_block.addClass('companies-block');
				});
			});
		}

		preloader_percentage.text(Math.round((totalCount - count) / totalCount * 100));
	}
	$.each(textures, function(id,v){
		var loader = new THREE.TextureLoader();
		loader.load(v, function(texture){
			l(id, texture);
		});
	});
	$.each(stlModels, function(id,v){
		var loader = new THREE.STLLoader();
		loader.load(v, function(model){
			l(id, model);
		});
	});


	var r = function(){
		rem = parseFloat($('html').css('font-size'));

		start = 1285 * rem / ratio;

		stop2 = 852 * rem / ratio;
		offset2 = 325 * rem / ratio;

		renderer.setSize(width * rem, height * rem);
	}
	r();
	$(window).resize(r);
});
