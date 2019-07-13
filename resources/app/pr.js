const tf = require('@tensorflow/tfjs-node');
async function Polynomial(num,xsd,ysd) {
	// Create a simple model.
	const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [2] }));
	// Prepare the model for training: Specify the loss and the optimizer.
	model.compile({ loss: 'meanSquaredError', optimizer: 'SGD', useBias: 'false' });
	// Generate some synthetic data for training. (y = 2x - 1)
	// const xs = tf.tensor2d([[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1]], [8, 2]);
	// const ys = tf.tensor2d([[0],[1],[2],[3],[4],[5],[6],[7]], [8, 1]);
    // // Train the model using the data.
    const xs =tf.tensor2d([...xsd],[xsd.length,2])
    const ys = tf.tensor2d([...ysd],[ysd.length,1])
	await model.fit(xs, ys, { epochs: 2500 });
	// Use the model to do inference on a data point the model hasn't seen.
	// Perform within a tf.tidy block to perform cleanup on intermediate tensors.
	tf.tidy(() => {
		// Should print approximately 39.
		console.log(model.predict(tf.tensor2d([num],[1,2])).dataSync()[0].toFixed(0));
	});
	// Manually clean up the memory for these variables.
	xs.dispose();
	ys.dispose();
}
module.exports = Polynomial;
