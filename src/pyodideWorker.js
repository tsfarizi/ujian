// Mengimpor Pyodide dari CDN
self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js");

let pyodideReadyPromise;

async function loadPyodideInstance() {
  if (typeof loadPyodide === "function") {
    self.pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
    });
  } else {
    throw new Error("loadPyodide is not defined. Pyodide script may not be loaded correctly.");
  }
}

// Inisialisasi Pyodide setelah skrip diimpor
pyodideReadyPromise = loadPyodideInstance();

// Mengatur pesan yang diterima dari thread utama
self.onmessage = async (event) => {
  // Tunggu sampai Pyodide siap
  await pyodideReadyPromise;

  const { code } = event.data; // Kode Python yang dikirim dari thread utama

  try {
    // Jalankan kode Python
    const result = await self.pyodide.runPython(code);
    // Kirim hasil eksekusi kembali ke thread utama
    self.postMessage({ result });
  } catch (error) {
    // Kirim pesan error jika eksekusi gagal
    self.postMessage({ error: error.message });
  }
};
