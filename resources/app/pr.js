const tf = require('@tensorflow/tfjs-node');
var model = tf.sequential();
const path = require('path');
const os = require('process');
let pwd = os.cwd()
async function Polynomial(xsd, ysd) {
	//const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [xsd[0].length] }));
	model.compile({ loss: 'meanSquaredError', optimizer: 'SGD', useBias: 'false', learningRate: 0.8 });
	const xs = tf.tensor2d([...xsd], [xsd.length, xsd[0].length]);
	const ys = tf.tensor2d([...ysd], [ysd.length, ysd[0].length]);
	await model.fit(xs, ys, { epochs: 2500, verbose: 0 });

	xs.dispose();
	ys.dispose();
	try {
        let fp = `file://${path.join(pwd, '/my-model')}`;
        console.log(fp)
		model.save(fp);
	} catch (error) {
		console.log(err);
	}

	return model;
}
module.exports = {
	train: Polynomial,
	predict: async num => {
		let x=0;
		await tf.tidy(() => {
			x = model
				.predict(tf.tensor2d([num], [1, num.length]))
				.dataSync()[0]
				.toFixed(0);
		});
		return x;
    },
    load:async(modelpath)=>{
        model = await tf.loadLayersModel(`file://${path.relative(pwd,modelpath)}`)
    }
};
