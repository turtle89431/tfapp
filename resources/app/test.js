const pr = require('./pr');
const xs = [[0, 0, 4], [0, 1, 3], [0, 2, 8], [1, 0, 0], [1, 1, 1], [0, 1, 2], [2, 0, 2], [2, 1, 1]];
const ys = [[0], [1], [2], [3], [4], [5], [6], [7]];
const num = [0, 0, 3];

let test = async () => {
    await pr.train(xs, ys);
    // await pr.load("./my-model/model.json")
    console.log(await pr.predict(num))
    
    // pr.predict([1,1,1])
};
test();
