/**
 * Lógica do Sorteador Pro

 */

const state = {
    sorteados: []
};

function gerarSorteio() {
    const display = document.getElementById('display-area');
    const config = {
        qtd: parseInt(document.getElementById('quantidade').value),
        min: parseInt(document.getElementById('min').value),
        max: parseInt(document.getElementById('max').value),
        semRepeticao: document.getElementById('nao-repetir').checked
    };

    // Validações de Sistema
    if (config.min >= config.max) {
        return logErro("Erro: Mínimo >= Máximo");
    }

    const rangeDisponivel = config.max - config.min + 1;
    if (config.semRepeticao && config.qtd > rangeDisponivel) {
        return logErro("Erro: Range insuficiente");
    }

    // Processamento
    state.sorteados = [];
    while (state.sorteados.length < config.qtd) {
        let num = Math.floor(Math.random() * rangeDisponivel) + config.min;
        
        if (config.semRepeticao) {
            if (!state.sorteados.includes(num)) state.sorteados.push(num);
        } else {
            state.sorteados.push(num);
        }
    }

    renderizarResultados();
}

function renderizarResultados() {
    const display = document.getElementById('display-area');
    display.innerHTML = '';

    state.sorteados.forEach((n, i) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'number-card';
            card.innerHTML = n;
            display.appendChild(card);
        }, i * 50);
    });
}

function logErro(msg) {
    const display = document.getElementById('display-area');
    display.innerHTML = `<div style="color: var(--secondary); font-family: var(--font-code)">[SYS_ERROR]: ${msg}</div>`;
}

function limparPainel() {
    document.getElementById('display-area').innerHTML = '<div class="empty-state">Aguardando execução...</div>';
}
