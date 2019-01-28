const {
    getMask,
    getLines,
    transform,
    getSpaces,
    joinWithKeyword
} = require("../functions.js");

describe("The function ", () => {
    const keyword = "SPLIT";

    const text = [
        "This is some SPLIT text",
        "I want SPLIT to test",
        "Nothing to report here",
        "It SPLIT should be getting",
        "split where there SPLIT is"
    ].join("\n");

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
        "This is some      SPLIT text",
        "I want            SPLIT to test",
        "Nothing to report here",
        "It                SPLIT should be getting",
        "split where there SPLIT is"
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
