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
   
   global $post;
   
   // For preview in Editor 
   if($is_preview && $post->post_status === 'auto-draft'){
   
   } 
  
  // Dynamic block ID
  $block_id = '${responses.name}-' . $block['id'];
  if( !empty($block['anchor']) ) {
    $block_id = $block['anchor'];
  }
  
  
  // Create class attribute allowing for custom "className".
  $className = '${responses.name}-block';
  if( !empty($block['className']) ) {
      $className .= ' ' . $block['className'];
  }
  ?>
  
  <section class="<?= $className; ?>" id="<?= $block_id; ?>">
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
