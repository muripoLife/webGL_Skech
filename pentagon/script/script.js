/***************
 *base sample
 ***************/

(() => {
	window.addEventListener('load', () => {
		// glcubic の初期化
		gl3.initGL('canvas');
		// ready プロパティが false の場合初期化失敗
		if(!gl3.ready){
			console.log('initialize error');
			return;
		}
		// キャンバスの大きさはウィンドウの短辺
		let canvasSize = Math.min(window.innerWidth, window.innerHeight);
		gl3.canvas.width  = canvasSize;
		gl3.canvas.height = canvasSize;
		// glcubic の機能を使ってプログラムを生成
		let prg = gl3.program.create(
			'vs',
			'fs',
			['position', 'color'],
			[3, 4],
			['globalColor'],
			['4fv']
		);
		// - [やってみよう] ---------------------------------------------------
		// 現在は、三角形がひとつだけ表示されるような構造になっています。これは
		// サンプル 003 とまったく同じ初期状態です。
		// これを自分で修正して、いびつな形で構わないので「五角形」にしてみてく
		// ださい。WebGL では、原則として「三角形」以外のポリゴンは作れません。
		// よって、五角形を形作るためには、最低でも三枚のポリゴンが必要になると
		// いうことがヒントです。がんばってチャレンジしてみてください。
		// --------------------------------------------------------------------

			// 1.0,0.0,0.0,
			// 0.3090169943749474241023,0.9510565162951535721164,0.0,
			// -0.8090169943749474241023,0.5877852522924731291687,0.0,
			// -0.8090169943749474241023,0.5877852522924731291687,0.0,
			// 0.3090169943749474241023	-0.9510565162951535721164,0.0


		// 頂点の座標データ
		// let position = []
		let position1 = [
			1.0,0.0,0.0,
			0.3090169943749474241023,0.9510565162951535721164,0.0,
			-0.8090169943749474241023,0.5877852522924731291687,0.0
		];
		let position2 = [
			1.0,0.0,0.0,
			-0.8090169943749474241023,0.5877852522924731291687,0.0,
			-0.8090169943749474241023,-0.5877852522924731291687,0.0
		];
		let position3 = [
			0.3090169943749474241023,-0.9510565162951535721164,0.0,
			-0.8090169943749474241023,-0.5877852522924731291687,0.0,
			1.0,0.0,0.0
		];
		// position.push(position1);
		// position.push(position2);
		// position.push(position3);

		// 頂点の色データ
		// let color_list = []
		let color1 = [
			0.5, 0.5, 0.5, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.0, 0.0, 1.0, 1.0
		];
		let color2 = [
			1.0, 0.0, 0.0, 1.0,
			0.5, 0.5, 0.5, 1.0,
			0.0, 0.0, 1.0, 1.0
		];
		let color3 = [
			1.0, 0.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.5, 0.5, 0.5, 1.0
		];

		// color_list.push(color);
		// color_list.push(color);
		// color_list.push(color);

		// 座標データから頂点バッファを生成
		let VBO1 = [gl3.create_vbo(position1), gl3.create_vbo(color1)];
		let VBO2 = [gl3.create_vbo(position2), gl3.create_vbo(color2)];
		let VBO3 = [gl3.create_vbo(position3), gl3.create_vbo(color3)];
		// let VBO = [];
		// VBO.push(
		// 	gl3.create_vbo(position1),
		// 	gl3.create_vbo(color1)
			// gl3.create_vbo(position2),
			// gl3.create_vbo(color2),
			// gl3.create_vbo(position3),
			// gl3.create_vbo(color3)
		// );

		// for(var i = 0; i < position.length; i++){
		// 	VBO.push(
		// 		gl3.create_vbo(position[i]),
		// 		gl3.create_vbo(color[i])
		// 	)
		// }

		// レンダリング関数を呼ぶ
		render();
		function render(){
			// ビューを設定
			gl3.scene_view(null, 0, 0, gl3.canvas.width, gl3.canvas.height);
			// シーンのクリア
			gl3.scene_clear([0.7, 0.7, 0.7, 1.0]);
			// プログラムをセット
			prg.set_program();
			// プログラムに頂点バッファをアタッチ
			// for(var i = 0; i < VBO.length; i++){
			// 	prg.set_attribute(VBO);
			// }
			// prg.set_attribute(VBO);
			prg.set_attribute(VBO1);
			// prg.set_attribute(VBO2);
			// prg.set_attribute(VBO3);
			// uniform 変数をシェーダにプッシュ
			prg.push_shader([[1.0, 1.0, 1.0, 1.0]]);
			// ドローコール（描画命令）
			gl3.draw_arrays(gl3.gl.TRIANGLES, 3);

			// prg.set_attribute(VBO1);
			prg.set_attribute(VBO2);
			// prg.set_attribute(VBO3);
			// uniform 変数をシェーダにプッシュ
			prg.push_shader([[1.0, 1.0, 1.0, 1.0]]);
			// ドローコール（描画命令）
			gl3.draw_arrays(gl3.gl.TRIANGLES, 3);

			// prg.set_attribute(VBO1);
			// prg.set_attribute(VBO2);
			prg.set_attribute(VBO3);
			// uniform 変数をシェーダにプッシュ
			prg.push_shader([[1.0, 1.0, 1.0, 1.0]]);
			// ドローコール（描画命令）
			gl3.draw_arrays(gl3.gl.TRIANGLES, 3);



		}
	}, false);
})();

