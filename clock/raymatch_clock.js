/*
============================================================================
raymarch
============================================================================
*/

(() => { // function(){
	window.addEventListener('load', () => {
		// 汎用変数の宣言
		let run       = true;                // Esc キーで動作を止めることができるようにフラグを設定
		let width     = window.innerWidth;   // ブラウザのクライアント領域の幅
		let height    = window.innerHeight;  // ブラウザのクライアント領域の高さ
		let targetDOM = document.getElementById('raymarching_canvas_container'); // スクリーンとして使う DOM

		let renderer  = new THREE.WebGLRenderer();
		// レンダラに関するパラメータ
		let RENDERER_PARAMETER = {
			clearColor: 0x333333,
			width: width,
			height: height
		};
		renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
		renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
		targetDOM.appendChild(renderer.domElement);

		const shaderScene = new THREE.Scene();
		const shaderCamera  = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -1, 1);
		shaderCamera.position.x += window.innerWidth / 2;
		const clock    = new THREE.Clock();
		// JSからGLSLへ変数を渡す変数
		const shaderUniforms = {
			resolution: {
				value: new THREE.Vector2(window.innerWidth, window.innerHeight)
			},
			time: {
				value: 0
			}
		};
		const shaderGeometry  = new THREE.PlaneGeometry(
			window.innerWidth,
			window.innerHeight
		);
		const shaderMaterial  = new THREE.ShaderMaterial({
			vertexShader: document.getElementById("vs").textContent,
			fragmentShader: document.getElementById("fs").textContent,
			uniforms: shaderUniforms
		});
		const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial);
		// shaderMesh.position.x = -300;
		shaderScene.add(shaderMesh);

		/* レンダリングループを定義 */
		let count = 0;
		render();
		function render(){
			time                      = clock.getElapsedTime();
			shaderUniforms.time.value = clock.getElapsedTime();

			if(run){
				requestAnimationFrame(render);
				renderer.render(shaderScene, shaderCamera);
			}
		}
	}, false);
})();