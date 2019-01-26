module.exports = {
    getSpaces(max, index) {
        const diff = max - index;
        return new Array(diff).fill(" ");
    },

    transform(lines, mask, getSpaces) {
        const max = Math.max(...mask);
        return lines.map((line, i) => {
            if (mask[i]) {
                const extended = [line[0], ...getSpaces(max, mask[i])].join("");
                line.splice(0, 1, extended);
            }
            return line;
        });
    },

    getLines(text, keyword) {
        return text.split("\n").map(line => line.split(keyword));
    },

    getMask(lines) {
        return lines.map(line => {
            if (line.length > 1) {
                return line[0].length;
            }
            return 0;
        });
    },

    joinWithKeyword(transformed, keyword) {
        return transformed.map(l => l.join(keyword)).join("\n");
    }
};
