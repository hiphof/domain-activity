var fs = require("fs");

fs.readFile("input/ParsedResult.txt", "utf8", (err, data) => {
  //fs.readFile("input/some_data.txt", "utf8", (err, data) => {
  if (err) throw err;
  var textByLine = data.split("\n");

  let clean_object = [];
  let no_url = [];

  textByLine.forEach(element => {
    //console.log(element);
    const domain_regex = /(.*)(nl|com)/;
    let match_with = domain_regex.test(element);
    if (match_with == true) {
      clean_object.push(element);
      console.log(element);
      console.log("good one");
    } else {
      no_url.push(element);
      console.log("bad one");
    }
  });

  console.log(clean_object);
  //console.log(textByLine);
  console.log(clean_object.length); // 229 items
  fs.writeFile("bad_data.txt", no_url, callback);
  console.log(textByLine.length);
});

let callback = () => {
  console.log("wrote bad file");
};
