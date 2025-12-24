# SundaLang for VS Code

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/broman0x/sundalang-extension-vscode)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Ekstensi resmi untuk SundaLang (Bahasa Pemrograman Sunda Pandeglang).**

Menyediakan syntax highlighting dan fitur run file untuk memudahkan coding SundaLang di VS Code.

## ✨ Fitur

- **Syntax Highlighting**: Pewarnaan kode untuk keyword, tipe data, dan fungsi.
- **Run File**: Klik kanan pada file `.sl` atau `.sunda` lalu pilih **SundaLang: Run File**.

## ⚙️ Syarat

Wajib menginstall interpreter **SundaLang** (binary/exe) dan menambahkannya ke **PATH** sistem.

## 📦 Instalasi

1. Download file `.vsix` terbaru.
2. Di VS Code, buka **Extensions** > Menu **...** > **Install from VSIX**.
3. Pilih file `.vsix` tersebut.

## 💻 Contoh Kode

```sunda
# Program Hitung Umur
tanda umur = 25

lamun umur > 20 {
    cetakkeun("Geus kolot euy!")
} lamunteu {
    cetakkeun("Budak kénéh.")
}
```

## 📄 Lisensi

Berlisensi **MIT**. Lihat [LICENSE](LICENSE).
