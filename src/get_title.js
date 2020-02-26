const axios = require("axios");
var fs = require("fs");

function Domain(url) {
  this.url = url;
  this.forsale = "no";
  this.title = "";
  this.status = 0;
}

let no_url = [];
let domain_array = [];
let alldomains = [];
fs.readFile("input/some_data_without_http.txt", "utf8", (err, data) => {
  //fs.readFile("input/ParsedResult.txt", "utf8", (err, data) => {
  if (err) throw err;
  let textByLine = data.split("\n");
  //test if it is a domain name
  textByLine.forEach(element => {
    const domain_regex = /(.*)(nl|com|me)/;
    let match_with = domain_regex.test(element);
    if (match_with == true) {
      domain_array.push(element);
      //console.log(element);
      //console.log("good one");
    } else {
      no_url.push(element);
      //console.log("bad one");
    }
  });

  let elements_with_http = [];
  domain_array.forEach(function(element_a) {
    elements_with_http.push("http://" + element_a);
    return elements_with_http;
  });
  domain_array = elements_with_http;

  //create object
  domain_array.forEach(function(element) {
    //console.log(element);
    alldomains.push(new Domain(element));
  });

  console.log(alldomains);
  console.log(alldomains.findIndex(Domain.status !== 0));
  console.log(some_number);
  console.log(alldomains.length);
  //console.log(domain_array);
  // makeUrl(domain_array);
});

function makeUrl(domain_array) {
  let list_of_sites = [];
  list_of_sites = domain_array;

  console.log("list_of_sites::: " + list_of_sites);
  let website = [];
  list_of_sites.forEach(function(element) {
    axios
      .get(element)
      .then(resp => {
        let response_of_page = resp.status;

        let regexp = /<title>(.*)<\/title>/;
        let some_data = resp.data;
        let new_title = some_data.match(regexp);
        //console.log(new_title[1]);
        let website_object = {
          url: element,
          title: new_title[1],
          status: response_of_page
        };
        console.log(website_object);
        website.push(website_object);
        fs.writeFile(
          "results/result.json",
          JSON.stringify(website, null, 4),
          callback
        );
        let number_of_websites = website.length;
        function callback() {
          console.log(
            "/// Wrote " + number_of_websites + " items to file succesfully"
          );
          // 127 items
        }
      })
      .catch(error => {
        console.log(error.response);
        console.log("hello");
      })
      .then(() => {
        console.log("bye");
      });
  });
}
