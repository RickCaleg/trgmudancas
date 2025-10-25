const TRG = (function () {

    document.addEventListener('DOMContentLoaded', Inicializar);

    function Inicializar() {
        Galeria.Inicializar();
        Orcamento.Inicializar();
    }

    const Galeria = (function () {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const imagens = Array.from(document.querySelectorAll('.galeria img'));
        let indexAtual = 0;

        function Inicializar() {
            Configurar_Galeria();
        }
        function Configurar_Galeria() {
            imagens.forEach((img, i) => {
                img.addEventListener('click', () => abrir(i));
            });

            lightbox.addEventListener('click', fechar);

            // ⌨️ Controles pelo teclado
            document.addEventListener('keydown', (e) => {
                if (lightbox.style.display !== 'flex') return;

                if (e.key === 'Escape') fechar();
                if (e.key === 'ArrowRight') proxima();
                if (e.key === 'ArrowLeft') anterior();
            });
        }

        function abrir(index) {
            indexAtual = index;
            lightboxImg.src = imagens[indexAtual].src;
            lightbox.style.display = 'flex';
        }

        function fechar() {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }

        function proxima() {
            indexAtual = (indexAtual + 1) % imagens.length;
            lightboxImg.src = imagens[indexAtual].src;
        }

        function anterior() {
            indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
            lightboxImg.src = imagens[indexAtual].src;
        }
        return {
            Inicializar: Inicializar
        };
    })();

    const Orcamento = (function () {
        const container = document.getElementById('orcamento');

        const form = container.querySelector('form');

        const txtNome = form.querySelector('input[name="nome"]');
        const txtTelefone = form.querySelector('input[name="telefone"]');
        const txtOrigem = form.querySelector('input[name="origem"]');
        const txtDestino = form.querySelector('input[name="destino"]');
        const cmbData = form.querySelector('select[name="data"]');
        const cmbPorte = form.querySelector('select[name="porte"]');
        const txtItens = form.querySelector('textarea[name="itens"]');

        const link = form.querySelector('a.link-orcamento');

        function Inicializar() {
            Configurar_BotaoEnviar();
            Configurar_AlteracaoCampos();
        }
        function Configurar_BotaoEnviar() {
            link.addEventListener('click', function (e) {
                if (txtNome.value.trim() === '' || txtTelefone.value.trim() === '' ||
                    txtOrigem.value.trim() === '' || txtDestino.value.trim() === '' ||
                    cmbData.value.trim() === '' || cmbPorte.value.trim() === '' ||
                    txtItens.value.trim() === '') {
                    e.preventDefault();
                    alert('Por favor, preencha os campos obrigatórios: Nome, Telefone, Origem, Destino, Data, Porte e Itens.');
                }
            });
        }
        function Configurar_AlteracaoCampos() {
            const campos = [txtNome, txtTelefone, txtOrigem, txtDestino, cmbData, cmbPorte, txtItens];

            campos.forEach(function (campo) {
                campo.addEventListener('input', AtualizarLink);
            });
            AtualizarLink();
        }

        function AtualizarLink() {
            const texto =
                `*Olá, quero um orçamento de mudança:*

*Nome:* ${txtNome.value}
*Telefone:* ${txtTelefone.value}
*Origem:* ${txtOrigem.value}
*Destino:* ${txtDestino.value}
*Data:* ${cmbData.value}
*Porte:* ${cmbPorte.value}

*Itens principais / Observações:*
${txtItens.value}`;

            const url = 'https://wa.me/5511975436369?text=' + encodeURIComponent(texto);
            link.setAttribute('href', url);
        }


        return {
            Inicializar: Inicializar
        };
    })();
})();