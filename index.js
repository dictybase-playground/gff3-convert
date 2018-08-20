const fs = require("fs")

const filename = process.argv[2]
let initialArr = []
const finalArr = []
const jsonObj = {
  type: "genes",
  attributes: {},
}
let lastElem

fs.readFileSync(filename)
  .toString()
  .split("\n")
  .forEach(line => {
    initialArr = line.split("\t")
    if (initialArr[0] === "6" && initialArr[2] === "gene") {
      lastElem = initialArr[8] // eslint-disable-line

      const convertedArr = [initialArr[3], initialArr[4], initialArr[6]]

      // destructure the converted array
      const [elem1, elem2, elem3] = convertedArr

      jsonObj.id = lastElem.slice(3, 15)
      jsonObj.attributes.block_id = "DDB0232433"
      jsonObj.attributes.start = elem1
      jsonObj.attributes.end = elem2
      jsonObj.attributes.strand = elem3

      finalArr.push(JSON.stringify(jsonObj))
    }
  })
console.log(finalArr.length)
fs.appendFileSync("./output.json", finalArr)
