

document.querySelector('.generate-qr-code').addEventListener('click', function (){
    var url = document.querySelector('.qr-url').value
    var size = document.querySelector('.qr-size').value
    var qrcodeDiv = document.querySelector('#qrcode')
    var downloadBtn = document.querySelector('.download-qr-code');
    var downloadBtnDiv = document.querySelector('.downloadBtn');
    document.querySelector('#qrcode').innerHTML = ''
    let currentQrCodeDataURL = '';

    var qrcode = new QRCode(document.querySelector('#qrcode'), {
        text: `${url}`,
        width: `${size}`,
        height: `${size}`,
        colorDark: `black`,
        colorLight: `white`,
        correctLevel: QRCode.CorrectLevel.H
    })

    setTimeout(() => {
        // Usa html2canvas para "tirar uma foto" da div do QR Code
        html2canvas(qrcodeDiv.querySelector('img') || qrcodeDiv.querySelector('canvas')).then(canvas => {
            currentQrCodeDataURL = canvas.toDataURL('image/png');

            downloadBtnDiv.style.display = 'block';
        }).catch(error => {
            console.error("Erro ao renderizar o QR Code para download:", error);
            alert("Não foi possível preparar o QR Code para download. Tente novamente.");
        });
    }, 100); // 100ms de atraso

    downloadBtn.addEventListener('click', () => {
        if (currentQrCodeDataURL) {
            const link = document.createElement('a');
            link.href = currentQrCodeDataURL;
            link.download = 'qrcode.png'; // Nome do arquivo para download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Nenhum QR Code gerado para download.');
        }
    });

})
