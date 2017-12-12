// Keith Hough, keithsportfolio.com, 2017

"use strict";

// possible conflict with bootstrap jquery
// var $ = function(id) { return document.getElementById(id); };

// initialize the UI - disable all elements
// except choosing which ipsum
var setUI = function() {

    document.getElementById("ipsum").readOnly = true;
    document.getElementById("p-tag").disabled = true;
    document.getElementById("num-paragraphs").value = 1;
    document.getElementById("num-quotes").value = "";
    document.getElementById("p-tag").checked = false;
    document.getElementById("copy").disabled = true;
    document.getElementById("clear").disabled = true;
};  // setUI function

// change stylesheets based on which ipsum is chosen
// and re-generate ipsum
var changeCSS = function(stylesheet) {

    document.getElementById("style").setAttribute("href", stylesheet);
    generateIpsum();
    document.getElementById("num-quotes").disabled = false;
};

// generate new ipsum and update the DOM
var generateIpsum = function() {

    var ipsum = "";
    var randomIndex;

    // get user input
    var numQuotes = document.getElementById("num-quotes").value;
    var numParagraphs = document.getElementById("num-paragraphs").value;

    // if valid input
    if (numQuotes > 0) {

        // if not already enabled
        document.getElementById("num-paragraphs").disabled = false;
        document.getElementById("p-tag").disabled = false;

        // for each paragraph, generate random quotes based on ipsum chosen;
        // this loop will be skipped when number of paragraphs is less than 1
        for (var i = 0; i < numParagraphs; i++) {
            if (document.title === "Beer Ipsum") {
                for (var j = 0; j < numQuotes; j++) {
                    randomIndex = Math.floor(Math.random() * beerIpsum.length);
                    ipsum += beerIpsum[randomIndex] + " ";
                }
                ipsum = trimLastCharacter(ipsum);   // trim trailing space
            }
            else if (document.title === "Bart Ipsum") {
                for (var j = 0; j < numQuotes; j++) {
                    randomIndex = Math.floor(Math.random() * bartsQuotes.length);
                    ipsum += bartsQuotes[randomIndex] + " ";
                }
                ipsum = trimLastCharacter(ipsum);   // trim trailing space
            }
            ipsum += "\n\n";
        }   // for each paragraph

        // trim trailing double line break
        ipsum = trimLastCharacter(ipsum);
        ipsum = trimLastCharacter(ipsum);

        // update the DOM with new ipsum
        document.getElementById("ipsum").textContent = ipsum;

        // add <p> tags if user selected them
        paragraphTag();

        // enable copy and clear buttons if not already enabled
        document.getElementById("copy").disabled = false;
        document.getElementById("clear").disabled = false;

    }   // if valid input

};  // generateIpsum function

// add/remove <p> tags based on user selection
var paragraphTag = function() {

      // get ipsum text from DOM
      var ipsum = document.getElementById("ipsum").textContent;

      // add <p> tags
      if (document.getElementById("p-tag").checked == true) {
          ipsum = "<p>" + ipsum;
          ipsum = ipsum.replace(/\n\n/g, "</p>\n\n<p>");
          ipsum = ipsum + "</p>";
      }

      // remove <p> tags
      else {
          ipsum = ipsum.replace(/<p>/g, "");
          ipsum = ipsum.replace(/<\/p>/g, "");
      }

      // update the DOM
      document.getElementById("ipsum").textContent = ipsum;

};  // paragraphTag function

// trim the last character of a string
var trimLastCharacter = function(str) {
    var stringEdit = str.substr(0, str.length - 1);
    return stringEdit;
};

// select the ipsum text
var selectIpsum = function() {
    document.getElementById("ipsum").select();
};

// clear the ipsum text from the DOM and re-initialize the UI
var clearIpsum = function() {
    document.getElementById("ipsum").textContent = "";
    setUI();
    document.getElementById("num-quotes").disabled = false;
};

window.onload = function() {
    setUI();
    document.getElementById("num-quotes").oninput = generateIpsum;
    document.getElementById("num-quotes").onclick = function() { this.select(); }
    document.getElementById("num-paragraphs").oninput = generateIpsum;
    document.getElementById("num-paragraphs").onclick = function() { this.select(); }
    document.getElementById("p-tag").onclick = paragraphTag;
    document.getElementById("copy").onclick = selectIpsum;
    document.getElementById("clear").onclick = clearIpsum;
};
