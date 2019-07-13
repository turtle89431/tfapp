const tf = require('@tensorflow/tfjs-node');
async function Polynomial(num, xsd, ysd) {
	const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [2] }));
	model.compile({ loss: 'meanSquaredError', optimizer: 'SGD', useBias: 'false' });
	const xs = tf.tensor2d([...xsd], [xsd.length, 2]);
	const ys = tf.tensor2d([...ysd], [ysd.length, 1]);
	await model.fit(xs, ys, { epochs: 2500 });
	tf.tidy(() => {
		console.log(
			model
				.predict(tf.tensor2d([num], [1, 2]))
				.dataSync()[0]
				.toFixed(0)
		);
	});
	xs.dispose();
	ys.dispose();
}
module.exports = Polynomial;
