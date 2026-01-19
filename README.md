# SundaLang for VS Code

[![Version](https://img.shields.io/badge/version-1.0.2-blue.svg)](https://github.com/broman0x/sundalang-extension-vscode)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**VS Code extension untuk SundaLang (Bahasa Pemrograman Sunda Pandeglang)**

Syntax highlighting, IntelliSense, code snippets, dan fitur lainnya untuk memudahkan coding SundaLang di VS Code.

---

## ✨ Fitur

- **Syntax Highlighting** - Pewarnaan kode untuk keywords, operators, dan builtins (11 functions)
- **IntelliSense** - Autocomplete untuk keywords dan functions
- **Code Snippets** - 21 snippets siap pakai
- **Run File** - Jalankan file .sl dengan F5 atau Ctrl+R
- **REPL Integration** - Buka REPL langsung dari VS Code

---

## 📦 Instalasi

### Prasyarat
Install SundaLang CLI terlebih dahulu:

**Windows:**
```powershell
irm https://raw.githubusercontent.com/broman0x/sundalang/main/install.ps1 | iex
```

**Linux/macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/broman0x/sundalang/main/install.sh | bash
```

### Install Extension

**Dari VS Code Marketplace (Recommended):**
- Buka [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=bromanprjkt.sundalang-vscode-extension)
- Klik **Install**

**Dari VSIX:**
1. Download `.vsix` dari [Releases](https://github.com/broman0x/sundalang-extension-vscode/releases)
2. VS Code → Extensions → `...` → Install from VSIX

---

## 🚀 Snippets

| Prefix | Output |
|--------|--------|
| `cetak` | `cetakkeun("...")` |
| `tanya` | `tanyakeun("...")` |
| `tanda` | `tanda nama = nilai` |
| `lamun` | `lamun kondisi { ... }` |
| `lamunteu` | `lamun ... } lamunteu { ... }` |
| `kedap` | `kedap kondisi { ... }` |
| `fungsi` | `fungsi nama(params) { ... }` |
| `array` | `tanda arr = [1, 2, 3]` |
| `hash` | `tanda map = {"key": value}` |
| `sare` | `sare(1000)` |
| `panjang` | `panjang(array)` |
| `mimiti` | `mimiti(array)` |
| `tungtung` | `tungtung(array)` |
| `garede` | `garede(string)` |
| `laleutik` | `laleutik(string)` |

Dan banyak lagi! Ketik di file `.sl` untuk melihat semua snippets.

---

## 💻 Contoh

```sunda
tanda umur = 25

lamun umur > 17 {
    cetakkeun("Geus dewasa!")
} lamunteu {
    cetakkeun("Budak keneh.")
}
```

```sunda
fungsi tambah(a, b) {
    balik a + b
}

tanda hasil = tambah(5, 3)
cetakkeun(hasil)
```

```sunda
tanda daftar = [1, 2, 3, 4, 5]
cetakkeun(panjang(daftar))
cetakkeun(mimiti(daftar))
cetakkeun(tungtung(daftar))
```

---

## ⌨️ Keyboard Shortcuts

- **F5** atau **Ctrl+R** (⌘+R di Mac) → Run file
- **Ctrl+Space** → Trigger IntelliSense

---

## 📝 Changelog

### v1.0.2 (Latest)
- ✅ **Synced**: 100% Keyword & Function sync dengan core `pkg/sundalang` v1.0.4.
- ✅ **New Keywords**: `pikeun`, `milih`, `cobaan/sanya`, `buka`, `wadah`, `tetep`.
- ✅ **New Functions**: `waktu`, `acak`, `sare`, `reureuh`, `maca`, `nyerat`.
- ✅ **Comments**: Support gaya `//` (C-style) jeung `#` (Shell-style).
- ✅ **Clean Code**: Konfigurasi bersih tanpa komentar internal.
- ✅ **Icon**: File icon `.sl` ayeuna nganggo logo SundaLang.

### v1.0.1
- ✅ Syntax highlighting untuk 10 keywords + 11 builtin functions
- ✅ IntelliSense autocomplete
- ✅ 21 code snippets
- ✅ Run file (F5, Ctrl+R)
- ✅ REPL integration
- ✅ Hover documentation
- ✅ Format document
- ✅ Real-time diagnostics

---

## 🔗 Links

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=bromanprjkt.sundalang-vscode-extension)
- [SundaLang](https://github.com/broman0x/sundalang)
- [Issues](https://github.com/broman0x/sundalang-extension-vscode/issues)

---

## 📄 License

MIT License - Lihat [LICENSE](LICENSE) untuk detail.

---

**Hatur nuhun parantos nganggo SundaLang! 🙏**
