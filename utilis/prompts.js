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
    ${chalk.dim('(String) (Optional) Set keywords for the block. Seperate each keywork with a |.')}
    `);
    prompt.posttypes = readlineSync.question(`
    ${chalk.bold('Block Post Types:')}
    ${chalk.dim('(String) (Optional) Set available post-types for the block. Seperate with | per type.')}
    `);

    return {
        name: slugify(prompt.title, {
            lower: true,
            strict: true
        }),
        title: prompt.title,
        description: prompt.description || '',
        keywords: prompt.keywords || '',
        posttypes : prompt.posttypes || '',
    };
};