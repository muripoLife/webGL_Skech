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
		let controls;
		let renderer;
		let boxGeometry;
		let material;
		let box;
		let directional;
		let ambient;

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

		var circleGeometry = new THREE.CircleGeometry( 2, 32 );
		var circleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		var circle   = new THREE.Mesh( circleGeometry, circleMaterial );
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
				let s1 = Math.sin(count * 0.05);
				let c1 = Math.cos(count * 0.05);
				let s2 = Math.sin(count * 0.1);
				let c2 = Math.cos(count * 0.1);
				// let e = Math.exp(Math.cos(count * 0.1));

				// 回転移動
				// circle.position.x = c1*c2;
				// circle.position.y = c1*s2;
				// circle.position.z = s1;

				// 平行移動
				// circle.rotation.y += 0.01;
				// circle.rotation.x += 0.01;
				/* レンダラにシーンとカメラを渡して描画させる*/
				renderer.render(scene, camera);
				if(run){requestAnimationFrame(render);}
		}
		renderer.render(scene, camera);
	}, false);
})();
