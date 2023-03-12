import fs from "fs";
import Conf from "conf";
const config = new Conf();
import Path from "path";

function writeFile(path, contents, cb) {
	fs.mkdir(Path.dirname(path), { recursive: true }, function (err) {
		if (err) {
			return cb(err);
		}

		fs.writeFile(path, contents, cb);
	});
}

export default (responses) => {
	// Block render template content
	const renderTemplateContent = `
  <?php
  /**
   * Block Name: ${responses.title}
   *
   * Description: ${responses.description}
   *
   * @var block $block
   * @var is_preview $is_preview
   */
  
  // Dynamic block ID
  $block_id = '${responses.name}-' . $block['id'];
  if( !empty($block['anchor']) ) {
    $block_id = $block['anchor'];
  }
  
  
  // Create class attribute allowing for custom "className".
  $className = '${responses.name}'-block;
  if( !empty($block['className']) ) {
      $className .= ' ' . $block['className'];
  }
  ?>
  
  <section id="<?= $block_id; ?>" class="<?= $className; ?>">
  </section>
  `;

	/**
	 * Question:
	 * Should I be creating this directory if it does not exist or throw an error?
	 **/

	writeFile(`${config.get("renderTemplateFolderPath")}/${responses.name}/${responses.name}.php`, renderTemplateContent, function (err) {
		if (err) throw err;
	});
};
