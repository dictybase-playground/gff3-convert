const fs = require("fs")
const { Transform } = require("stream")

exports.command = "pipe-convert [file] [chr]"
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
    .example("pipe-convert -f sample.gff3 -c 6")
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
  let lastElem
  const jsonObj = {
    type: "genes",
    attributes: {},
  }
  const origFile = fs.createReadStream(argv.file)
  const convertedFile = fs.createWriteStream("./output.json")

  const fileTransformer = new Transform({
    objectMode: true,

    transform(chunk, _, done) {
      chunk
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

            this.push(JSON.stringify(jsonObj))
          }
        })

      done()
    },
  })

  origFile.pipe(fileTransformer).pipe(convertedFile)
}
