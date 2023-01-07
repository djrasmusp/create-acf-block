#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import Conf from 'conf';
import appRoot from 'app-root-path';

const schema = {
  preferencesSet: {
    type: 'boolean'
  },
  hasFlags: {
    type: 'boolean',
    default: false
  },
  renderTemplateFolderPath: {
    type: 'string',
    default: ''
  },
  blockNamespace: {
    type: 'string',
    default: ''
  },
  blockCategory : {
    type: 'string',
    default : ''
  }
}
const config = new Conf({schema});

/**  
 * Utilities
 * 1. Preferences - Only runs during the first use of the CLI, unless the --preference flag is present
 * 2. Prompts - All of the questions to populate the render template and register the block
 * 3. Creates the render template
 * 4. Registers the block
 * 5. Optionally creates CSS and JS
 * */
import preferences from './utilis/preferences.js';
import prompts from './utilis/prompts.js';
import createBlock from './utilis/createBlock.js';
import createJsonFile from "./utilis/createJsonFile.js";

(async () => {
  
  /**
   *  1. Check if registration file exists
   *  2. Check if registration file has comment markers
   *  3. Prompts
   *  4. Register block
   *  4. Create render template
   */
  
  function checkRegistrationFile(path) {
    return new Promise(function(resolve, regect) {
      if (fs.existsSync(path) === false) {
        regect(`Registration file path does not exist at: ${path}`);
      }
      resolve();
    });
  }

  function handleError(err) {
    console.log(err);
  }

  async function init() {
  
    preferences();
    await checkRegistrationFile(config.get('registerationFilePath'));
    
    let responses = prompts(config.hasFlags);

    createBlock(responses);
    createJsonFile(responses);
  }

  init().catch(handleError);
})();
