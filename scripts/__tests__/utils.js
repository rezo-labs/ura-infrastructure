import {
    getAllComponents,
} from '../utils';
import { COMPONENTS_DIR } from '../../constants';

describe('Test utils functions', () => {
    it('Test getAllComponents', () => {
        const allComponents = getAllComponents(COMPONENTS_DIR);
        const expectedOutputs = ['App', 'ChangeTitleForm', 'GlobalStyle', 'Head'];
        expect(allComponents.sort()).toEqual(expectedOutputs.sort());
    });
});
