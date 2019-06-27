/**
 * index.js file content
 * @param {string} component - Component name
 */
const indexJSContent = component => `export { default } from './${component}';
`;

/**
 * Component file content, can be function or class
 * @param {string} component - Component name
 * @param {boolean} cls - Indicate a class component
 */
const componentContent = (component, cls) => `import React from 'react';

export default ${cls ? `class ${component} extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            null
        );
    }
}` : `function ${component}(props) {
    return (
        null
    );
}`}
`;

/**
 * Component test file content
 * @param {*} component - Component name
 */
const testContent = component => `import React from 'react';
import { shallow } from 'enzyme';

import ${component} from './${component}';

describe('${component}', () => {
    const wrapper = shallow(<${component} />);

    it('', () => {
        //
    });
});
`;

/**
 * Component test file content
 * @param {*} component - Component name
 */
const storyBookContent = component => `import React from 'react';
import { storiesOf } from '@storybook/react';
import ${component} from './${component}';

storiesOf('${component}', module)
    .add('Initial', () => (
        <${component} />
    ));
`;

module.exports = {
    indexJSContent,
    componentContent,
    testContent,
    storyBookContent,
};
