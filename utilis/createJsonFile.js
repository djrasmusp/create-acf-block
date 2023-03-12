import fs from "fs";
import Conf from "conf";

const config = new Conf();
import Path from "path";

function writeFile(path, contents, cb) {
    fs.mkdir(Path.dirname(path), {recursive: true}, function (err) {
        if (err) {
            return cb(err);
        }

        fs.writeFile(path, contents, cb);
    });
}

export default (responses) => {
    const postTypes = responses.posttypes ? ',\n    "postTypes" : ' + JSON.stringify(responses.posttypes.split("|")) : '';
    // Block render template content
    const renderTemplateContent = `
{
  "name" : "${responses.name}",
  "title" : "${responses.title}",
  "description" : "${responses.description}",
  "category" : "${config.get("blockCategory")}",
  "version" : "1.0.0",
  "icon" : "",
  "apiVersion" : 2,
  "keywords" : ${JSON.stringify(responses.keywords.split('|'))},
  "acf" : {
  	"mode" : "auto",
  	"renderTemplate" : "${responses.name}.php"${postTypes}
  },
  "styles": [
  ],
  "supports" : {
    "align" : false,
  	"anchor": true,
  	"color" : {
  	    "text": false,
        "background": false,
        "link": false
  	}
  },
  "example" : {
    "attributes" : {
      "mode" : "edit",
      "data" : {
        "preview_image" : true
      }
    }
  }
}
  `;

    /**
     * Question:
     * Should I be creating this directory if it does not exist or throw an error?
     **/

    writeFile(`${config.get("renderTemplateFolderPath")}/${responses.name}/block.json`, renderTemplateContent, function (err) {
        if (err) throw err;
    });
};
