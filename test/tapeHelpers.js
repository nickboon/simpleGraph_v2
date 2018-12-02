module.exports = {
    assertEqualIgnoreWhiteSpace: (assert, actual, expected, message) => {
        const whitespace = /\s+/g;
        assert.equal(
            actual.replace(whitespace, ''),
            expected.replace(whitespace, ''),
            message
        );
    }
};