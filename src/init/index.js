// src/init/index.js

// import "./index.scss"
// import "../model/app.js"
// import "./routes.js"

import _ from "lodash"
import process from "process"
const benchmark = require("benchmark")
const Benchmark = benchmark.runInContext({
    _,
    process
})

window.Benchmark = benchmark

var suite = new Benchmark.Suite()

const n = 10

var bench_1 = (function() {
    return function() {
        for (let i = 0; i <= n; i++) {
            var number = 5
            if (i === n) {
                return n
            }
        }
    }
})()

var bench_2 = (function() {
    return function() {
        for (let i = 0; i <= n; i++) {
            var number = 5
            if (i === n) {
                return n
            }
        }
    }
})()


/**********************************************/

// add tests
suite
    .add("bench_1", bench_1)
    .add("bench_2", bench_2)
    // add listeners
    .on("cycle", function(event) {
        createParagraph(String(event.target))
    })
    .on("complete", function() {
        createParagraph("Fastest is " + this.filter("fastest").map("name"))
        createParagraph("---------")
    })
    // run async
    .run({
        async: true
    })

createParagraph("Please wait...")

function createParagraph(text) {
    var para = document.createElement("p")
    var t = document.createTextNode(text)
    para.appendChild(t)
    document.body.appendChild(para)
}
