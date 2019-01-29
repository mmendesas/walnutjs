const jsonparser = require('./jsonparser');
const store = require('../../../test/samples/store.json');

describe('[JSONPARSER] Unit tests', () => {

    const JSONPATH_string = `$..bicycle.color`;
    const JSONPATH_array = `$..bicycle.otherColors`;
    const JSONPATH_inArray = `$..book[0]`;
    const JSONPATH_number = `$..bicycle.price`;
    const JSONPATH_boolean = `$..bicycle.strong`;
    const JSONPATH_object = `$..bicycle.materials`;

    beforeEach(() => {
        jsonparser.init(JSON.parse(JSON.stringify(store)));
    });

    describe('GET value', () => {
        it('should get value from specific node [string]', (done) => {
            const value = jsonparser.getValue(JSONPATH_string)[0];
            expect(typeof value).toBe('string');
            expect(value).toEqual('red');
            done();
        });

        it('should get value from specific node [number]', (done) => {
            const value = jsonparser.getValue(JSONPATH_number)[0];
            expect(typeof value).toBe('number');
            expect(value).toEqual(19.95);
            done();
        });

        it('should get value from specific node [boolean]', (done) => {
            const value = jsonparser.getValue(JSONPATH_boolean)[0];
            expect(typeof value).toBe('boolean');
            expect(value).toEqual(true);
            done();
        });

        it('should get value from specific node [object]', (done) => {
            const value = jsonparser.getValue(JSONPATH_object)[0];
            expect(typeof value).toBe('object');
            expect(value).toEqual({ frame: "iron", wheels: "aluminium" });
            done();
        });

        it('should get value from specific node [array]', (done) => {
            const value = jsonparser.getValue(JSONPATH_array)[0];
            expect(value).toBeInstanceOf(Array);
            expect(value).toEqual(["red", "green", "blue"]);
            done();
        });

        it('should get value from specific node [inside array]', (done) => {
            const value = jsonparser.getValue(JSONPATH_inArray)[0];
            expect(value).toBeInstanceOf(Object);
            expect(value).toEqual({
                author: "Herman Melville",
                title: "Moby Dick",
                price: 8.99
            });
            done();
        });
    });

    describe('UPDATE value', () => {
        it('should set another value to specific node [string]', (done) => {
            jsonparser.setValue(JSONPATH_string, 'green');
            const value = jsonparser.getValue(JSONPATH_string)[0];
            expect(value).toEqual('green');
            done();
        });

        it('should set another value to specific node [number]', (done) => {
            jsonparser.setValue(JSONPATH_number, 14.7);
            const value = jsonparser.getValue(JSONPATH_number)[0];
            expect(value).toEqual(14.7);
            done();
        });

        it('should set another value to specific node [boolean]', (done) => {
            jsonparser.setValue(JSONPATH_boolean, false);
            const value = jsonparser.getValue(JSONPATH_boolean)[0];
            expect(value).toBeFalsy();
            done();
        });

        it('should set another value to specific node [object]', (done) => {
            jsonparser.setValue(JSONPATH_object, { teste: '123' });
            const value = jsonparser.getValue(JSONPATH_object)[0];
            expect(value).toEqual({ teste: '123' });
            done();
        });

        it('should set another value to specific node [array]', (done) => {
            jsonparser.setValue(JSONPATH_array, [14.7, 'test']);
            const value = jsonparser.getValue(JSONPATH_array)[0];
            expect(value).toEqual([14.7, 'test']);
            done();
        });

        it('should set another value to specific node [inside array]', (done) => {
            jsonparser.setValue(JSONPATH_inArray, { teste: '123' });
            const value = jsonparser.getValue(JSONPATH_inArray)[0];
            expect(value).toEqual({ teste: '123' });
            done();
        });
    });

    describe('DELETE value', () => {
        it('should delete a specific node [string]', (done) => {
            jsonparser.deleteKey(JSONPATH_string);
            expect(jsonparser.getValue(JSONPATH_string)).toHaveLength(0);
            done();
        });

        it('should delete a specific node [number]', (done) => {
            jsonparser.deleteKey(JSONPATH_number);
            expect(jsonparser.getValue(JSONPATH_number)).toHaveLength(0);
            done();
        });

        it('should delete a specific node [boolean]', (done) => {
            jsonparser.deleteKey(JSONPATH_boolean);
            expect(jsonparser.getValue(JSONPATH_boolean)).toHaveLength(0);
            done();
        });

        it('should delete a specific node [object]', (done) => {
            jsonparser.deleteKey(JSONPATH_object);
            expect(jsonparser.getValue(JSONPATH_object)).toHaveLength(0);
            done();
        });

        it('should delete a specific node [array]', (done) => {
            jsonparser.deleteKey(JSONPATH_array);
            expect(jsonparser.getValue(JSONPATH_array)).toHaveLength(0);
            done();
        });

        it('should delete a specific node [inside array]', (done) => {
            expect(jsonparser.getValue("$..book")[0]).toHaveLength(2);
            jsonparser.deleteKey(JSONPATH_inArray);
            expect(jsonparser.getValue("$..book")[0]).toHaveLength(1);
            done();
        });
    });

}); 