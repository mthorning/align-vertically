const {
    getMask,
    getLines,
    transform,
    getSpaces,
    joinWithKeyword
} = require("../functions.js");

describe("getLines", () => {
    const text = [
        "This is some A text",
        "I want A to test",
        "Nothing to report here",
        "It A should be getting",
        "split where there A is"
    ].join("\n");
    const keyword = "A";

    const expectedLines = [
        ["This is some ", " text"],
        ["I want ", " to test"],
        ["Nothing to report here"],
        ["It ", " should be getting"],
        ["split where there ", " is"]
    ];

    const expectedMask = [13, 7, 0, 3, 18];

    const expectedTransformed = [
        ["This is some      ", " text"],
        ["I want            ", " to test"],
        ["Nothing to report here"],
        ["It                ", " should be getting"],
        ["split where there ", " is"]
    ];

    const expectedResult = [
        "This is some      A text",
        "I want            A to test",
        "Nothing to report here",
        "It                A should be getting",
        "split where there A is"
    ].join("\n");

    test("getLines returns expected", () => {
        expect(getLines(text, keyword)).toEqual(expectedLines);
    });

    test("getMask returns expected", () => {
        expect(getMask(expectedLines)).toEqual(expectedMask);
    });

    test("getSpaces returns expected", () => {
        expectedMask.forEach(index => {
            const diff = 18 - index;
            expect(getSpaces(18, index).length).toBe(diff);
        });
    });

    test("transform returns expected", () => {
        expect(transform(expectedLines, expectedMask, getSpaces)).toEqual(
            expectedTransformed
        );
    });

    test("joinWithKeyword returns expected", () => {
        expect(joinWithKeyword(expectedTransformed, keyword)).toEqual(
            expectedResult
        );
    });
});
