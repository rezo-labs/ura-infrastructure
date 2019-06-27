import path from 'path';
import {
    checkSubPath,
    validateComponent,
    validateDirectory,
} from '../new-component/validate';

describe('Test new-component functions', () => {
    it('checkSubPath should work as expected', () => {
        const subpath = path.resolve('foo', 'bar');
        const thePath = path.resolve(subpath, 'baz');
        const anotherPath = path.resolve('foo', 'baz');
        expect(checkSubPath(subpath, thePath)).toBe(true);
        expect(checkSubPath(subpath, subpath)).toBe(true);
        expect(checkSubPath(thePath, thePath)).toBe(true);

        expect(checkSubPath(thePath, subpath)).toBe(false);
        expect(checkSubPath(subpath, anotherPath)).toBe(false);
        expect(checkSubPath(anotherPath, thePath)).toBe(false);
    });

    it('validateComponent should work as expected', () => {
        const { message } = validateComponent;
        expect(validateComponent('Card')).toBe(true);
        expect(validateComponent('BigCard')).toBe(true);
        expect(validateComponent('AVeryBigCard')).toBe(true);
        expect(validateComponent('BiGcArD')).toBe(true);

        expect(validateComponent('card')).toBe(message);
        expect(validateComponent('bigCard')).toBe(message);
        expect(validateComponent('1Card')).toBe(message);
        expect(validateComponent('_Card')).toBe(message);
        expect(validateComponent('Card_')).toBe(message);
        expect(validateComponent('*')).toBe(message);
        expect(validateComponent('.')).toBe(message);
        expect(validateComponent('Big_Card')).toBe(message);
        expect(validateComponent('BigCard1')).toBe(message);
    });

    it('validateDirectory should work as expected', () => {
        const { message } = validateDirectory;
        expect(validateDirectory('atom')).toBe(true);
        expect(validateDirectory(path.join('composition', 'atom'))).toBe(true);
        expect(validateDirectory('.')).toBe(true);
        expect(validateDirectory('')).toBe(true);

        expect(validateDirectory('..')).toBe(message);
        expect(validateDirectory(path.join('..', 'atom'))).toBe(message);
        expect(validateDirectory(path.join('..', '..', 'atom'))).toBe(message);
    });
});
