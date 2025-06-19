

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

    downloadBtn.addEventListener('click', async () => { // Adicione 'async' aqui
        if (currentQrCodeDataURL) {
            try {
                // 1. Busca o Data URL para obter um Blob
                const response = await fetch(currentQrCodeDataURL);
                const blob = await response.blob();

                // 2. Cria um URL de objeto para o Blob
                const blobUrl = URL.createObjectURL(blob);

                // 3. Cria e clica no link temporário
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();

                // 4. Libera o URL de objeto para economizar memória
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);

            } catch (error) {
                console.error("Erro ao baixar o QR Code:", error);
                alert("Ocorreu um erro ao tentar baixar o QR Code.");
            }
        } else {
            alert('Nenhum QR Code gerado para download.');
        }
    });

})
