const fs = require("fs")

exports.command = "convert [file] [chr]"
exports.describe = "extract genes from specified chromosome in GFF3 into JSON format"
exports.builder = yargs => {
  yargs
    .positional("file", {
      alias: "f",
      type: "string",
      describe: "GFF3 file to convert",
    })
    .positional("chr", {
      alias: "c",
      type: "string",
      describe: "the chromosome to filter by",
    })
    .demandOption(["file", "chr"])
    .help("h")
    .example("convert -f sample.gff3 -c 6")
}

// helper function to convert chromosome name to ID
const chr2Id = id => {
  switch (id) {
    case "1":
      return "DDB0232428"
    case "2":
      return "DDB0232429"
    case "3":
      return "DDB0232430"
    case "4":
      return "DDB0232431"
    case "5":
      return "DDB0232432"
    case "6":
      return "DDB0232433"
    default:
      return id
  }
}

exports.handler = argv => {
  let initialArr = []
  const finalArr = []
  const jsonObj = {
    type: "genes",
    attributes: {},
  }
  let lastElem

  fs.readFileSync(argv.file)
    .toString()
    .split("\n")
    .forEach(line => {
      initialArr = line.split("\t")
      if (initialArr[0] === argv.chr && initialArr[2] === "gene") {
        lastElem = initialArr[8] // eslint-disable-line

        const convertedArr = [initialArr[3], initialArr[4], initialArr[6]]

        // destructure the converted array
        const [elem1, elem2, elem3] = convertedArr

        jsonObj.id = lastElem.slice(3, 15)
        jsonObj.attributes.block_id = chr2Id(argv.chr)
        jsonObj.attributes.start = elem1
        jsonObj.attributes.end = elem2
        jsonObj.attributes.strand = elem3

        finalArr.push(JSON.stringify(jsonObj))
      }
    })
  console.log(finalArr.length)
  fs.appendFileSync("./output.json", finalArr)
}
