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

    // Block render template content
    const renderTemplateContent = `
  {
  "name" : "${responses.name}",
  "title" : "${responses.title}",
  "description" : "${responses.description}",
  "category" : "${config.get("blockCategory")}",
  "apiVersion" : 2,
  "keywords" : ${JSON.stringify(responses.keywords.split(' '))}
  "acf" : {
  	"mode" : "auto",
  	"renderTemplate" : "${responses.name}.php"
  },
  "supports" : {
    "align" : false,
  	"anchor": true
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
