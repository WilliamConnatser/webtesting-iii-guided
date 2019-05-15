const helpers = require('./helpers');
const axios = require('axios');

//Mock via function
//You can also mock via the mock folder
jest.mock('uuid', () => {
    return () => '1234'
});

describe('helpers', () => {
    describe('makePerson()', () => {

    })

    describe('forEvenOnly()', () => {
        it('should invoke a callback when given an even number', () => {
            const spy = jest.fn();
            helpers.forEvenOnly(2, spy);
            helpers.forEvenOnly(4, spy);
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(1, 2);
            expect(spy).toHaveBeenNthCalledWith(2, 4);
        })

        it('should not invoke a callback when given an odd number', () => {
            const spy = jest.fn();
            helpers.forEvenOnly(3, spy);
            helpers.forEvenOnly(2, spy);
            helpers.forEvenOnly(9, spy);
            helpers.forEvenOnly(7, spy);
            helpers.forEvenOnly(5, spy);
            expect(spy).toHaveBeenCalledTimes(1);
        })

        it('returns a smile', () => {
            const spy = jest.fn(() => 'smile');
            const greeting = helpers.greet(spy);
            expect(greeting).toBe('smile');
        })
    })

    describe('axios()', () => {
        it('API fail with no password', done => {
            const url = 'a url';

            axios.post(url, {})
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.success).toBe(true);
                    done();
                })
                .catch(error => {
                    expect(error.statusCode).toBe(422);
                    expect(error.success).toBe(false);
                    done();
                })
        })

        it('API success', done => {
            const url = 'a url';

            axios.post(url, {
                    password: 'mellons'
                })
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.success).toBe(true);
                    done();
                })
                .catch(error => {
                    expect(error.statusCode).toBe(401);
                    expect(error.success).toBe(false);
                    done();
                })
        })

        it('API fail with bad password', done => {
            const url = 'a url';

            axios.post(url, {
                    password: 'wrongPassword'
                })
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    expect(response.success).toBe(true);
                    done();
                })
                .catch(error => {
                    expect(error.statusCode).toBe(401);
                    expect(error.success).toBe(false);
                    done();
                })
        })
    });
})