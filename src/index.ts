/*
 * Copyright (C) 2022 Team Kodi
 * This file is part of kodi-connect - https://github.com/kodi-game/kodi-connect
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 * See LICENSE.txt for more information.
 */

import QrScanner from "./qr-scanner";

//////////////////////////////////////////////////////////////////////////
// Application info
//////////////////////////////////////////////////////////////////////////

console.log("-------------------------------------");
console.log(`${document.title}`);
console.log("-------------------------------------");

//////////////////////////////////////////////////////////////////////////
// UI logic
//////////////////////////////////////////////////////////////////////////

async function onClient() {
  const videoPreview: HTMLElement | null =
    document.getElementById("videoPreview");

  if (videoPreview !== null) {
    // Hide UI
    const displayArea: HTMLElement | null =
      document.getElementById("displayArea");
    if (displayArea) {
      displayArea.style.display = "none";
    }

    // Show video
    videoPreview.style.display = "block";

    // Start QR scanner
    const qrScanner = new QrScanner(
      videoPreview as HTMLVideoElement,
      (result) => {
        qrScanner.stop();
        videoPreview.style.display = "none";
        if (displayArea) {
          displayArea.style.display = "block";
        }
        alert(`Decoded QR code: ${result.data}`);
      },
      {}
    );
    await qrScanner.start();
  }
}

// Install UI logic
const contentArea: HTMLElement | null = document.getElementById("contentArea");
if (contentArea !== null) {
  contentArea.onclick = onClient;
}

//////////////////////////////////////////////////////////////////////////
// Entry point
//////////////////////////////////////////////////////////////////////////

window.addEventListener("load", async () => {
  console.log("Entering application");
});

// Fix error:
//
//   [@snowpack/plugin-typescript] src/index.ts(13,1): error TS1208: 'index.ts'
//   cannot be compiled under '--isolatedModules' because it is considered a
//   global script file. Add an import, export, or an empty 'export {}'
//   statement to make it a module.
export {};
