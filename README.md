# gff3-convert

Node.js command line tool for extracting genes from specified chromosome in GFF3 file into JSON format

To get started:

```
npm install https://github.com/dictybase-playground/gff3-convert
```

The script has two main commands -- `convert` and `pipe-convert`.

### convert

This command takes two arguments: `file` (the gff3 file to convert) and `chr` (the chromosome number, i.e. 6).

To run this script type:

```
gff3-to-json convert [-f|--file <file>] [-c|--chr <chromosome>]
```

Example:

```
gff3-to-json convert -f example.gff3 -c 6
```

### pipe-convert

This uses the same format as `convert` above, but the script reads and writes the data as a stream.

Example:

```
gff3-to-json pipe-convert -f example.gff3 -c 6
```

For help type:

```
gff-to-json -h
```
