import Conf from "conf";
const config = new Conf();
import readlineSync from "readline-sync";
import chalk from "chalk";
import path from "path";

const args = process.argv.slice(2);
const resetPreferences = args.indexOf("--preferences") === -1 ? false : true;

export default () => {
	/**
	 *  Preferences
	 *  Create block assets?
	 *    -- yes
	 *    Group block assets with render template?
	 *      -- no
	 *      cssPath
	 *      jsPath
	 */
	if (config.get("preferencesSet") != true || resetPreferences === true) {
		// Preferences not yet set or flag is present
		config.clear();

		console.log(chalk.bold.bgGreen.white(` Preferences: \n`));

		config.set(
			"renderTemplateFolderPath",
			path.relative(
				"./",
				readlineSync.questionPath(
					`${chalk.bold("\nRelative block render template folder path: \n")}` +
						`${chalk.dim("This is where your block render templates will be created.\n")}` +
						`${chalk.dim('Example: template-parts/blocks"')}\n`,
					{
						isDirectory: true,
						exists: true,
					}
				)
			)
		);

		config.set(
			"blockNamespace",
			readlineSync.question(
				`${chalk.bold('Namespace:')}` +
				`${chalk.dim("(String) A unique namespace that identifies the block category. For example ‘category’. Note: A block category name can only contain lowercase alphanumeric characters and dashes, and must begin with a letter.\n")}`
			)
		)

		config.set(
			"blockCategory",
			readlineSync.question(
				`${chalk.bold('Category name:')}` +
				`${chalk.dim("(String) A unique name that identifies the block category (without namespace). For example ‘category’. Note: A block category name can only contain lowercase alphanumeric characters and dashes, and must begin with a letter.\n")}`
			)
		)

		config.set("preferencesSet", true);
	}
};
