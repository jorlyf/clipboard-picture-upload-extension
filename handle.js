const extensionOverlay = document.createElement('div');
extensionOverlay.className = 'extensionOverlay';

const extensionWindow = document.createElement('div');
extensionWindow.className = 'extensionWindow';
extensionWindow.innerHTML = 'CTRL + V';

const extensionMsg = document.createElement('p');
extensionMsg.className = 'extensionMsg';
extensionMsg.innerHTML = 'Учтите, что в буфере должен быть скриншот';


let input;

function handlePaste(e) {
    input.files = e.clipboardData.files;
    input.disabled = false;

    extensionOverlay.remove();
    window.removeEventListener('paste', handlePaste);
}

function handleChooseFile(e) {
    const confirmed = confirm('Хотите воспользоваться "Paste pictures from clipboard?');
    if (confirmed) {
        input = e.target;
        input.disabled = true;
    
        document.body.appendChild(extensionOverlay);
    
        extensionOverlay.appendChild(extensionWindow);
        extensionWindow.appendChild(extensionMsg);
    
        extensionOverlay.addEventListener('click', (e) => {
            if (e.target == extensionOverlay) {
                input.disabled = false;
                extensionOverlay.remove();
                window.removeEventListener('paste', handlePaste);
            }
        })
    
        window.addEventListener('paste', handlePaste);
    }
};

const inputs = document.querySelectorAll('input[type="file"]');
for (let i = 0; i < inputs.length; i++) {
    input = inputs[i];
    input.addEventListener('click', (e) => handleChooseFile(e));
}
