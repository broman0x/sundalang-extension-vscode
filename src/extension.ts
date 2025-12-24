import * as vscode from 'vscode';
import * as path from 'path';

let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    const runCommand = vscode.commands.registerCommand('sundalang.runFile', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('Teu aya file anu dibuka!');
            return;
        }

        const document = editor.document;
        
        if (document.isDirty) {
            document.save().then(() => executeFile(document));
        } else {
            executeFile(document);
        }
    });

    const formatter = vscode.languages.registerDocumentFormattingEditProvider('sundalang', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const edits: vscode.TextEdit[] = [];
            
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                const text = line.text;
                const trimmed = text.trimRight(); 
                
                if (text !== trimmed) {
                    const range = new vscode.Range(
                        i, 
                        trimmed.length, 
                        i, 
                        text.length
                    );
                    edits.push(vscode.TextEdit.delete(range));
                }
            }
            return edits;
        }
    });

    context.subscriptions.push(runCommand);
    context.subscriptions.push(formatter);
}

function executeFile(document: vscode.TextDocument) {
    const filePath = document.fileName;
    
    if (!terminal || terminal.exitStatus) {
        terminal = vscode.window.createTerminal('SundaLang');
    }

    terminal.show();
    
    const command = `sundalang "${filePath}"`;
    terminal.sendText(command);
}

export function deactivate() {
    if (terminal) {
        terminal.dispose();
    }
}