const TRG = (function () {

    document.addEventListener('DOMContentLoaded', Inicializar);

    function Inicializar() {
        Galeria.Inicializar();
        Orcamento.Inicializar();
    }

    const Galeria = (function () {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const galeriaScroll = document.querySelector('.galeria-scroll');
        const btnPrev = document.querySelector('.carousel-btn-prev');
        const btnNext = document.querySelector('.carousel-btn-next');
        const imagens = Array.from(document.querySelectorAll('.foto-item img'));
        let indexAtual = 0;

        function Inicializar() {
            Configurar_Galeria();
            Configurar_Carousel();
        }

        function Configurar_Galeria() {
            if (!imagens.length) return;

            imagens.forEach((img, i) => {
                img.addEventListener('click', () => abrir(i));
            });

            if (lightbox) {
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) fechar();
                });
            }

            // ⌨️ Controles pelo teclado
            document.addEventListener('keydown', (e) => {
                if (lightbox && lightbox.style.display !== 'flex') return;

                if (e.key === 'Escape') fechar();
                if (e.key === 'ArrowRight') proxima();
                if (e.key === 'ArrowLeft') anterior();
            });
        }

        function Configurar_Carousel() {
            if (!galeriaScroll || !btnPrev || !btnNext) return;

            // Scroll com roda do mouse e trackpad
            galeriaScroll.addEventListener('wheel', (e) => {
                // Detectar se é scroll horizontal (trackpad) ou vertical (mouse wheel)
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                    // Trackpad horizontal - deixar comportamento natural
                    return;
                }
                
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    galeriaScroll.scrollLeft += e.deltaY;
                }
            });

            // Melhor suporte para trackpad
            galeriaScroll.addEventListener('touchstart', (e) => {
                // Permitir scroll touch natural
            });

            // Botões de navegação
            btnPrev.addEventListener('click', () => scrollCarousel(-1));
            btnNext.addEventListener('click', () => scrollCarousel(1));

            // Verificar se precisa mostrar/ocultar botões
            galeriaScroll.addEventListener('scroll', Atualizar_BotoesCarousel);
            window.addEventListener('resize', Atualizar_BotoesCarousel);
            
            // Inicializar estado dos botões (com mais tempo para elementos carregarem)
            setTimeout(() => {
                Atualizar_BotoesCarousel();
                // Forçar visibilidade inicial se há conteúdo para rolar
                if (galeriaScroll.scrollWidth > galeriaScroll.clientWidth) {
                    btnNext.classList.remove('hidden');
                }
            }, 200);
        }

        function scrollCarousel(direction) {
            const scrollAmount = 320; // largura de uma foto + gap
            galeriaScroll.scrollLeft += direction * scrollAmount;
        }

        function Atualizar_BotoesCarousel() {
            if (!galeriaScroll || !btnPrev || !btnNext) return;

            const maxScrollLeft = galeriaScroll.scrollWidth - galeriaScroll.clientWidth;
            
            // Se não há scroll necessário, ocultar ambos os botões
            if (maxScrollLeft <= 0) {
                btnPrev.classList.add('hidden');
                btnNext.classList.add('hidden');
                return;
            }

            // Mostrar/ocultar botão anterior
            if (galeriaScroll.scrollLeft <= 5) {
                btnPrev.classList.add('hidden');
            } else {
                btnPrev.classList.remove('hidden');
            }

            // Mostrar/ocultar botão próximo
            if (galeriaScroll.scrollLeft >= maxScrollLeft - 5) {
                btnNext.classList.add('hidden');
            } else {
                btnNext.classList.remove('hidden');
            }
        }

        function abrir(index) {
            if (!lightbox || !lightboxImg) return;
            
            indexAtual = index;
            lightboxImg.src = imagens[indexAtual].src;
            lightboxImg.alt = imagens[indexAtual].alt;
            lightbox.style.display = 'flex';
        }

        function fechar() {
            if (!lightbox || !lightboxImg) return;
            
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }

        function proxima() {
            if (!imagens.length) return;
            
            indexAtual = (indexAtual + 1) % imagens.length;
            lightboxImg.src = imagens[indexAtual].src;
            lightboxImg.alt = imagens[indexAtual].alt;
        }

        function anterior() {
            if (!imagens.length) return;
            
            indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
            lightboxImg.src = imagens[indexAtual].src;
            lightboxImg.alt = imagens[indexAtual].alt;
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