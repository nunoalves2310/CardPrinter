
  // Generate a random password
  function randomPassword(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }

  // Generate new password + barcode
function generateBarcode() {
        
      const username = document.getElementById('username').value.trim();
      if (!username) {
        alert('Please enter a username.');
        return;
      }

      const password = randomPassword();
      const paddedUsername = username.padEnd(10, ' ');
    const combined = `${paddedUsername}${password}`;



      document.getElementById('passwordDisplay').textContent = `Generated Password: ${password}`;

      JsBarcode("#barcode", combined, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
        text: username
      });
    }

  // Encode existing password into barcode
  function encodeExisting() {
    const username = document.getElementById("username").value.trim();
    const pw = document.getElementById("passwordDisplay").value;
    if (!username || !pw) {
      alert("Username and password required");
      return;
    }
    const password = pw;
      const paddedUsername = username.padEnd(10, ' ');
    const combined = `${paddedUsername}${password}`;

    JsBarcode("#barcode", combined, { format: "CODE128", displayValue: true, text: username });
  }

  // Print barcode as image
  function printBarcodeAsImage() {
    const svg = document.getElementById("barcode");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
      const w = window.open("");
      w.document.write("<img src='" + img.src + "' style='width:300px;'>");
      w.document.close();
      w.focus();
      w.print();
      w.close();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  // Download barcode as SVG file
   function downloadBarcode() {
  const svg = document.getElementById("barcode");
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    const username = document.getElementById("username").value.trim() || "barcode";
downloadLink.download = `${username}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  img.src = url;
}





