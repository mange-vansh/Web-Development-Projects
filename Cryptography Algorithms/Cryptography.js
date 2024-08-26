document.addEventListener('DOMContentLoaded', () => {
    const proceedButton = document.getElementById('proceedButton');
    const cipherSelect = document.getElementById('CipherTechnique');

    proceedButton.addEventListener('click', () => {
        const selectedCipher = cipherSelect.value;

        switch (selectedCipher) {
            case 'Caesar Cipher':
                window.location.href = 'CaesarCipher.html';
                break;
            case 'Play Fair Cipher':
                window.location.href = 'PlayFairCipher.html';
                break;
            case 'Rail Fence Cipher':
                window.location.href = 'RailFenceCipher.html';
                break;
            case 'Hill Cipher':
                window.location.href = 'HillCipher.html';
                break;
            default:
                alert('Please select a valid cipher technique.');
        }
    });
});
