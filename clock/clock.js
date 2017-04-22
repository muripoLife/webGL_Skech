/*
============================================================================
時計。
============================================================================
*/

(() => { // function(){
	window.addEventListener('load', () => {
		// 汎用変数の宣言
		let run       = true;                // Esc キーで動作を止めることができるようにフラグを設定
		let width     = window.innerWidth;   // ブラウザのクライアント領域の幅
		let height    = window.innerHeight;  // ブラウザのクライアント領域の高さ
		let targetDOM = document.getElementById('webgl'); // スクリーンとして使う DOM
		// three.js 定義されているオブジェクトに関連した変数を宣言
		let scene;
		let camera;
		// let controls;
		let renderer;
		let directional;
		let ambient;

		let bigHandGeometry;
		let bigHandMaterial;
		let bigHand;

		let shortHandGeometry;
		let shortHandMaterial;
		let shortHand;

		let circleGeometry;
		let circleMaterial;
		let circle;

		// 各種パラメータを設定するために定数オブジェクトを定義
		let CAMERA_PARAMETER = {
			fovy: 60,
			aspect: width / height,
			near: 0.1,
			far: 10.0,
			x: 1.0,
			y: 2.0,
			z: 5.0,
			lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
		};
		// レンダラに関するパラメータ
		let RENDERER_PARAMETER = {
			clearColor: 0x333333,
			width: width,
			height: height
		};
		// スペキュラ成分をマテリアルに追加する
		let MATERIAL_PARAMETER = {
				color: 0xff9933,
				specular: 0xffffff
		};

		/*
		THREE.jsの実装のテンプレート
		*/
		/* シーンの初期化 */
		scene = new THREE.Scene();
		/* カメラの初期化 */
		camera = new THREE.PerspectiveCamera(
			CAMERA_PARAMETER.fovy,
			CAMERA_PARAMETER.aspect,
			CAMERA_PARAMETER.near,
			CAMERA_PARAMETER.far
		);
		camera.position.x = CAMERA_PARAMETER.x;
		camera.position.y = CAMERA_PARAMETER.y;
		camera.position.z = CAMERA_PARAMETER.z;
		camera.lookAt(CAMERA_PARAMETER.lookAt);

		// オービットコントロール(マウス操作のクラス)
		controls = new THREE.OrbitControls(camera, render.domElement);

		/* レンダラの初期化 */
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
		renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
		targetDOM.appendChild(renderer.domElement);

		bigHandGeometry = new THREE.BoxGeometry(0.1, 4.0, 0.1);
		bigHandMaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
		bigHand         = new THREE.Mesh( bigHandGeometry, bigHandMaterial );
		bigHand.position.x = 0.0;
		bigHand.position.y = -1.0;
		bigHand.position.z = 0.1;
		scene.add( bigHand );

		shortHandGeometry = new THREE.BoxGeometry(0.1, 2.0, 0.1);
		shortHandMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
		shortHand         = new THREE.Mesh( shortHandGeometry, shortHandMaterial );
		shortHand.position.x = 0.0;
		shortHand.position.y = -1.0;
		shortHand.position.z = 0.0;
		scene.add( shortHand );


		circleGeometry = new THREE.CircleGeometry( 2, 32 );
		circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		circle         = new THREE.Mesh( circleGeometry, circleMaterial );
		circle.position.x = 0.0;
		circle.position.y = 0.0;
		circle.position.z = -0.1;
		scene.add( circle );

		/* ライトオブジェクトを生成してシーンに追加する */
		// 光の色を0xffffffを白にしている.
		directional = new THREE.DirectionalLight(0xffffff);
		ambient = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(directional);
		scene.add(ambient);

		/* レンダリングループを定義 */
		let count = 0;
		render();
		function render(){
				count++;
				let s1 = Math.sin(count * 0.00005);
				let c1 = Math.cos(count * 0.00005);
				let c2 = Math.cos(count * 0.005);
				// let e = Math.exp(Math.cos(count * 0.1));

				bigHand.position.y = 0.0;
				bigHand.rotation.z += c1;

				shortHand.position.y = 0.0;
				shortHand.rotation.z += c2;

				/* レンダラにシーンとカメラを渡して描画させる*/
				renderer.render(scene, camera);
				if(run){requestAnimationFrame(render);}
		}
		renderer.render(scene, camera);
	}, false);
})();
