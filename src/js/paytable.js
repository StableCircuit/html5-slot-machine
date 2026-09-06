import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

// Worker and PDF are copied to fixed, predictable paths by CopyWebpackPlugin
// (see webpack.config.js). Plain relative paths are used on purpose here:
// they are resolved by the browser at runtime relative to paytable.html,
// with no dependency on webpack's import.meta.url asset handling.
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs/pdf.worker.min.mjs";

const pdfUrl = "assets/paytable.pdf";

const viewer = document.getElementById("viewer");
const status = document.getElementById("status");

async function renderPaytable() {
  try {
    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    const pdf = await loadingTask.promise;

    status.remove();

    const targetCssWidth = Math.min(900, window.innerWidth - 32);
    const dpr = window.devicePixelRatio || 1;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = (targetCssWidth / baseViewport.width) * dpr;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = targetCssWidth + "px";

      const wrap = document.createElement("div");
      wrap.className = "page-wrap";
      wrap.appendChild(canvas);
      viewer.appendChild(wrap);

      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
  } catch (err) {
    console.error(err);
    status.textContent =
      "Unable to load the paytable right now. Please try again later.";
  }
}

renderPaytable();
