import * as vscode from 'vscode';
import * as path from 'path';

let terminal: vscode.Terminal | undefined;
let statusBarItem: vscode.StatusBarItem;
let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {


    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(code) SundaLang";
    statusBarItem.tooltip = "SundaLang Extension Active";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);


    diagnosticCollection = vscode.languages.createDiagnosticCollection('sundalang');
    context.subscriptions.push(diagnosticCollection);


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


    const newFileCommand = vscode.commands.registerCommand('sundalang.newFile', async () => {
        const template = await vscode.window.showQuickPick([
            { label: 'Program Sederhana', description: 'Template program dasar' },
            { label: 'Program dengan Fungsi', description: 'Template dengan fungsi utama' },
            { label: 'File Kosong', description: 'Mulai dari nol' }
        ], { placeHolder: 'Pilih template file baru' });

        if (template) {
            createFileFromTemplate(template.label);
        }
    });


    const replCommand = vscode.commands.registerCommand('sundalang.openRepl', () => {
        if (!terminal || terminal.exitStatus) {
            terminal = vscode.window.createTerminal('SundaLang REPL');
        }
        terminal.show();
        terminal.sendText('sundalang');
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


    const completionProvider = vscode.languages.registerCompletionItemProvider('sundalang', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
            const completions: vscode.CompletionItem[] = [];


            const keywords = [
                { label: 'lamun', kind: vscode.CompletionItemKind.Keyword, detail: 'Kondisi if' },
                { label: 'lamunteu', kind: vscode.CompletionItemKind.Keyword, detail: 'Kondisi else' },
                { label: 'kedap', kind: vscode.CompletionItemKind.Keyword, detail: 'Loop while' },
                { label: 'balik', kind: vscode.CompletionItemKind.Keyword, detail: 'Return' },
                { label: 'tanda', kind: vscode.CompletionItemKind.Keyword, detail: 'Deklarasi variabel' },
                { label: 'fungsi', kind: vscode.CompletionItemKind.Keyword, detail: 'Definisi fungsi' },
                { label: 'bener', kind: vscode.CompletionItemKind.Value, detail: 'Boolean true' },
                { label: 'salah', kind: vscode.CompletionItemKind.Value, detail: 'Boolean false' },
            ];


            const builtins = [
                { label: 'cetakkeun', kind: vscode.CompletionItemKind.Function, detail: 'Print ke layar' },
                { label: 'tanyakeun', kind: vscode.CompletionItemKind.Function, detail: 'Input dari user' },
                { label: 'panjang', kind: vscode.CompletionItemKind.Function, detail: 'Panjang string/array' },
                { label: 'mimiti', kind: vscode.CompletionItemKind.Function, detail: 'Elemen pertama' },
                { label: 'tungtung', kind: vscode.CompletionItemKind.Function, detail: 'Elemen terakhir' },
                { label: 'asupkeun', kind: vscode.CompletionItemKind.Function, detail: 'Tambah ke array' },
                { label: 'garede', kind: vscode.CompletionItemKind.Function, detail: 'Uppercase string' },
                { label: 'laleutik', kind: vscode.CompletionItemKind.Function, detail: 'Lowercase string' },
                { label: 'kana_angka', kind: vscode.CompletionItemKind.Function, detail: 'Convert ke angka' },
                { label: 'kana_tulisan', kind: vscode.CompletionItemKind.Function, detail: 'Convert ke string' },
                { label: 'tipe', kind: vscode.CompletionItemKind.Function, detail: 'Cek tipe data' },
                { label: 'sare', kind: vscode.CompletionItemKind.Function, detail: 'Sleep/delay (ms)' },
                { label: 'reureuh', kind: vscode.CompletionItemKind.Function, detail: 'Delay/tunggu (ms)' },
            ];

            return [...keywords, ...builtins].map(item => {
                const completion = new vscode.CompletionItem(item.label, item.kind);
                completion.detail = item.detail;
                return completion;
            });
        }
    });


    const hoverProvider = vscode.languages.registerHoverProvider('sundalang', {
        provideHover(document: vscode.TextDocument, position: vscode.Position) {
            const wordRange = document.getWordRangeAtPosition(position);
            if (!wordRange) return;

            const word = document.getText(wordRange);
            const hoverInfo: { [key: string]: string } = {
                'cetakkeun': '**cetakkeun(nilai)** - Mencetak nilai ke layar\n\nContoh: `cetakkeun("Halo Dunya!")`',
                'tanyakeun': '**tanyakeun(prompt)** - Meminta input dari user\n\nContoh: `tanda nama = tanyakeun("Saha ngaran anjeun?")`',
                'lamun': '**lamun** - Kondisi if\n\nContoh:\n```sunda\nlamun umur > 17 {\n    cetakkeun("Geus dewasa")\n}\n```',
                'lamunteu': '**lamunteu** - Kondisi else\n\nDigunakan setelah lamun untuk kondisi alternatif',
                'kedap': '**kedap** - Loop while\n\nContoh:\n```sunda\nkedap i < 10 {\n    cetakkeun(i)\n    tanda i = i + 1\n}\n```',
                'tanda': '**tanda** - Deklarasi variabel\n\nContoh: `tanda umur = 25`',
                'fungsi': '**fungsi** - Definisi fungsi\n\nContoh:\n```sunda\nfungsi tambah(a, b) {\n    balik a + b\n}\n```',
                'balik': '**balik** - Return value dari fungsi\n\nContoh: `balik hasil`',
                'bener': '**bener** - Boolean true',
                'salah': '**salah** - Boolean false',
                'panjang': '**panjang(nilai)** - Mengembalikan panjang string atau array\n\nContoh: `panjang("halo")` → 4',
                'kana_angka': '**kana_angka(string)** - Convert string ke angka\n\nContoh: `kana_angka("123")` → 123',
                'kana_tulisan': '**kana_tulisan(nilai)** - Convert nilai ke string\n\nContoh: `kana_tulisan(123)` → "123"',
                'tipe': '**tipe(nilai)** - Cek tipe data dari nilai\n\nContoh: `tipe(123)` → "angka"',
            };

            if (word in hoverInfo) {
                return new vscode.Hover(hoverInfo[word]);
            }
        }
    });


    const diagnosticsProvider = vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === 'sundalang') {
            validateDocument(event.document);
        }
    });


    const diagnosticsOnOpen = vscode.workspace.onDidOpenTextDocument(document => {
        if (document.languageId === 'sundalang') {
            validateDocument(document);
        }
    });

    context.subscriptions.push(
        runCommand,
        newFileCommand,
        replCommand,
        formatter,
        completionProvider,
        hoverProvider,
        diagnosticsProvider,
        diagnosticsOnOpen
    );
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

function createFileFromTemplate(templateName: string) {
    let content = '';

    switch (templateName) {
        case 'Program Sederhana':
            content = `# Program SundaLang
# Tulis kode di sini

cetakkeun("Halo Dunya!")
`;
            break;
        case 'Program dengan Fungsi':
            content = `# Program SundaLang dengan Fungsi

fungsi utama() {
    cetakkeun("Program dimimitian...")
    
    # Tulis kode di sini
    
    balik 0
}

utama()
`;
            break;
        default:
            content = '';
    }

    vscode.workspace.openTextDocument({
        content: content,
        language: 'sundalang'
    }).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}

function validateDocument(document: vscode.TextDocument) {
    const diagnostics: vscode.Diagnostic[] = [];
    const text = document.getText();


    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();


        const doubleQuotes = (line.match(/"/g) || []).length;
        const singleQuotes = (line.match(/'/g) || []).length;

        if (doubleQuotes % 2 !== 0 && !line.startsWith('#')) {
            const range = new vscode.Range(i, 0, i, lines[i].length);
            const diagnostic = new vscode.Diagnostic(
                range,
                'String teu ditutup (kurang tanda kutip)',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }

        if (singleQuotes % 2 !== 0 && !line.startsWith('#')) {
            const range = new vscode.Range(i, 0, i, lines[i].length);
            const diagnostic = new vscode.Diagnostic(
                range,
                'String teu ditutup (kurang tanda kutip tunggal)',
                vscode.DiagnosticSeverity.Error
            );
            diagnostics.push(diagnostic);
        }


        if (line.includes('function') && !line.startsWith('#')) {
            const range = new vscode.Range(i, 0, i, lines[i].length);
            const diagnostic = new vscode.Diagnostic(
                range,
                'Gunakan "fungsi" tinimbang "function"',
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }

        if (line.includes('print') && !line.startsWith('#')) {
            const range = new vscode.Range(i, 0, i, lines[i].length);
            const diagnostic = new vscode.Diagnostic(
                range,
                'Gunakan "cetakkeun" tinimbang "print"',
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }

        if ((line.includes('if') || line.includes('else')) && !line.startsWith('#')) {
            const range = new vscode.Range(i, 0, i, lines[i].length);
            const diagnostic = new vscode.Diagnostic(
                range,
                'Gunakan "lamun/lamunteu" tinimbang "if/else"',
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }
    }

    diagnosticCollection.set(document.uri, diagnostics);
}

export function deactivate() {
    if (terminal) {
        terminal.dispose();
    }
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    if (diagnosticCollection) {
        diagnosticCollection.dispose();
    }
}