const vscode = require("vscode");

const {
    getMask,
    getLines,
    transform,
    getSpaces,
    joinWithKeyword
} = require("./functions.js");

function getKeywordFromUser() {
    return vscode.window.showInputBox({
        placeHolder: "Align by which word?"
    });
}

async function alignVertically() {
    const editor = vscode.window.activeTextEditor;
    const text = editor.document.getText(editor.selection);
    if (text) {
        const keyword = await getKeywordFromUser();
        const lines = getLines(text, keyword);
        const mask = getMask(lines);
        const transformedText = transform(lines, mask, getSpaces);
        const result = joinWithKeyword(transformedText, keyword);
        editor.edit(builder => builder.replace(editor.selection, result));
    }
}

function activate(context) {
    let disposable = vscode.commands.registerCommand(
        "extension.alignVertically",
        alignVertically
    );

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate,
    getMask,
    getLines,
    transform,
    getSpaces
};
