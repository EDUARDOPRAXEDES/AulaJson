
const cepInput = document.getElementById('cep'); // Campo de input do CEP
const logradouroInput = document.getElementById('logradouro'); // Campo de input da Rua
const bairroInput = document.getElementById('bairro');       // Campo de input do Bairro
const localidadeInput = document.getElementById('localidade'); // Campo de input da Cidade
const ufInput = document.getElementById('uf');           // Campo de input do Estado
const messageDiv = document.getElementById('message');   // Div para exibir mensagens de erro/sucesso


cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, ''); 

    if (cep.length !== 8) {
        clearAddressFields();
        displayMessage('CEP inválido. Digite 8 números.', 'red');
        return;
    }
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => {
            if (!response.ok) { // Ok é 200
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                clearAddressFields();
                displayMessage('CEP não encontrado.', 'red');
            } else {
                logradouroInput.value = data.logradouro;
                bairroInput.value = data.bairro;
                localidadeInput.value = data.localidade;
                ufInput.value = data.uf;
                displayMessage('Endereço encontrado!', 'green');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            clearAddressFields(); // Limpa os campos
            displayMessage('Ocorreu um erro ao buscar o CEP. Tente novamente.', 'red');
        });
});


function clearAddressFields() {
    logradouroInput.value = '';
    bairroInput.value = '';
    localidadeInput.value = '';
    ufInput.value = '';
}

function displayMessage(message, color) {
    messageDiv.textContent = message;
    messageDiv.style.color = color;
}
