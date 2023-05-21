function encryptFile() {
    var fileInput = document.getElementById('file-input');
    var keyInput = document.getElementById('key-input');

    if (fileInput.files.length === 0 || !keyInput.value) {
        alert('Please select a file and enter a key.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var encryptedText = encrypt(event.target.result, keyInput.value);
        displayResult(encryptedText);
        downloadFile(encryptedText, 'encrypted.txt');
    };
    reader.readAsText(file);
}

function decryptFile() {
    var fileInput = document.getElementById('file-input');
    var keyInput = document.getElementById('key-input');

    if (fileInput.files.length === 0 || !keyInput.value) {
        alert('Please select a file and enter a key.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var decryptedText = decrypt(event.target.result, keyInput.value);
        displayResult(decryptedText);
    };
    reader.readAsText(file);
}

function encrypt(text, key) {
    var encryptedText = '';
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.toLowerCase().charCodeAt(0) - 97;
            var keyNum = parseInt(key[i % key.length]);
            var shiftedCharCode = (charCode + keyNum) % 26 + 97;
            var encryptedChar = String.fromCharCode(shiftedCharCode);
            encryptedText += isUpperCase ? encryptedChar.toUpperCase() : encryptedChar;
        } else {
            encryptedText += char;
        }
    }
    return encryptedText;
}

function decrypt(text, key) {
    var decryptedText = '';
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.toLowerCase().charCodeAt(0) - 97;
            var keyNum = parseInt(key[i % key.length]);
            var shiftedCharCode = (charCode - keyNum + 26) % 26 + 97;
            var decryptedChar = String.fromCharCode(shiftedCharCode);
            decryptedText += isUpperCase ? decryptedChar.toUpperCase() : decryptedChar;
        } else {
            decryptedText += char;
        }
    }
    return decryptedText;
}
function displayResult(result) {
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = result;
    resultElement.style.display = 'block';
}

function downloadFile(text, filename) {
    var element = document.getElementById('download-link');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.click();
}

window.onload = function () {
    var fileInput = document.getElementById('file-input');
    fileInput.value = '';
    var keyInput = document.getElementById('key-input');
    keyInput.value = '';

}
