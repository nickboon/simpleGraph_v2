class Divisions {
    static getIncrementsInRange(a, b, increment) {
        if (increment < 0)
            throw new Error('Increment cannot be less than 0.');

        const result = [];
        if (a < b)
            for (let i = a + increment; i < b; i += increment)
                result.push(i);
        if (a > b)
            for (let i = a - increment; i > b; i -= increment)
                result.push(i);

        return result;
    }
}

module.exports = Divisions;