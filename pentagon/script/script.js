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

		// 1.0,0.0,0.0,
		// 0.3090169943749474241023,0.9510565162951535721164,0.0,
		// -0.8090169943749474241023,0.5877852522924731291687,0.0,
		// -0.8090169943749474241023,0.5877852522924731291687,0.0,
		// 0.3090169943749474241023,-0.9510565162951535721164,0.0


		// 頂点の座標データ
		let position_list = []
		let position1 = [
			1.0,0.0,0.0,
			0.3090169943749474241023,0.9510565162951535721164,0.0,
			-0.8090169943749474241023,0.5877852522924731291687,0.0
		];
		let position2 = [
			-0.8090169943749474241023,0.5877852522924731291687,0.0,
			1.0,0.0,0.0,
			-0.8090169943749474241023,-0.5877852522924731291687,0.0
		];
		let position3 = [
			0.3090169943749474241023,-0.9510565162951535721164,0.0,
			-0.8090169943749474241023,-0.5877852522924731291687,0.0,
			1.0,0.0,0.0
		];
		position_list.push(position1);
		position_list.push(position2);
		position_list.push(position3);

		// 頂点の色データ
		let color_list = []
		let color1 = [
			1.0, 0.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.0, 0.0, 1.0, 1.0
		];
		let color2 = [
			0.0, 0.0, 1.0, 1.0,
			1.0, 0.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0
		];
		let color3 = [
			0.0, 1.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			1.0, 0.0, 0.0, 1.0,
		];

		color_list.push(color1);
		color_list.push(color2);
		color_list.push(color3);

		let VBO_list = [];

		for(var i = 0; i < position_list.length; i++){
			VBO_list.push(
				[
				gl3.create_vbo(position_list[i]),
				gl3.create_vbo(color_list[i])
				]
			)
		}

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
			for(var i = 0; i < VBO_list.length; i++){
				prg.set_attribute(VBO_list[i]);
				// uniform 変数をシェーダにプッシュ
				prg.push_shader([[1.0, 1.0, 1.0, 1.0]]);
				// ドローコール（描画命令）
			// gl3.draw_arrays(gl3.gl.TRIANGLES, 3);
			// gl3.draw_arrays(gl3.gl.POINTS, 3);
			// gl3.draw_arrays(gl3.gl.LINES, 3);
			// gl3.draw_arrays(gl3.gl.LINE_STRIP, 3);
			// gl3.draw_arrays(gl3.gl.TRIANGLES, 3);
			gl3.draw_arrays(gl3.gl.TRIANGLE_STRIP, 3);
			}
		}
	}, false);
})();

