import readlineSync from 'readline-sync';
import chalk from 'chalk';
import slugify from "slugify";

const args = process.argv.slice(2);

export default () => {
    /**
     * If no args, show all prompts.
     * Otherwise only show required prompts and prompts for present flags
     */
    function allowPrompt(flag) {
        if (args.length === 0) {
            return true;
        } else if (args.indexOf('--simple') != -1) {
            return false;
        } else {
            return (args.indexOf(flag) != -1);
        }
    }

    const prompt = {};

    prompt.name = readlineSync.question(`
    ${chalk.bold('Block name:')}
    ${chalk.dim('(String) A unique name that identifies the block (without namespace). For example ‘testimonial’. Note: A block name can only contain lowercase alphanumeric characters and dashes, and must begin with a letter.')}
    `);

    prompt.title = readlineSync.question(`
    ${chalk.bold('Block title:')}
    ${chalk.dim('(String) The display title for your block. For example ‘Testimonial’.')}
    `);

    prompt.description = readlineSync.question(`
    ${chalk.bold('Block description:')}
    ${chalk.dim('(String) (Optional) This is a short description for your block.')}
    `);

    prompt.keywords = readlineSync.question(`
    ${chalk.bold('Block keywords:')}
    ${chalk.dim('(String) (Optional) Blocks are grouped into categories to help users browse and discover them. The core provided categories are [ common | formatting | layout | widgets | embed ]. Plugins and Themes can also register custom block categories.')}
    `);
    prompt.posttypes = readlineSync.question(`
    ${chalk.bold('Block Post Types:')}
    ${chalk.dim('(String) (Optional) Blocks are grouped into categories to help users browse and discover them. The core provided categories are [ common | formatting | layout | widgets | embed ]. Plugins and Themes can also register custom block categories.')}
    `);

    return {
        name: slugify(prompt.name, {
            lower: true,
            strict: true
        }),
        title: prompt.title,
        description: prompt.description || '',
        keywords: prompt.keywords || '',
        posttypes : prompt.posttypes || '',
    };
};