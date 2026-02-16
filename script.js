document.addEventListener('DOMContentLoaded', () => {
    // Toast System
    function showToast(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-message">${message}</span>`;

        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-in forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 1. Copy Prompt Functionality
    const copyBtn = document.querySelector('.btn-primary.full-width.mb-sm');
    const promptBox = document.querySelector('.prompt-box');

    if (copyBtn && promptBox) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = promptBox.textContent.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.style.backgroundColor = 'var(--success-color)';
                copyBtn.style.borderColor = 'var(--success-color)';
                showToast('Prompt copied to clipboard', 'success');

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.backgroundColor = '';
                    copyBtn.style.borderColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showToast('Failed to copy prompt', 'error');
            });
        });
    }

    // 2. Secondary Panel Buttons
    const panelButtons = document.querySelectorAll('.secondary-panel .btn');

    panelButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.textContent.trim().toLowerCase();

            if (text.includes('lovable')) {
                // Open external link
                window.open('https://lovable.dev', '_blank');
                showToast('Opening Lovable in new tab...', 'info');
            } else if (text.includes('it worked')) {
                showToast('Step marked as complete!', 'success');
                // Auto-check logic working if not already checked
                const logic = document.getElementById('logic-working');
                if (logic && !logic.checked) {
                    logic.click();
                }
            } else if (text.includes('error')) {
                showToast('Simulated error logged.', 'error');
            } else if (text.includes('screenshot')) {
                // Simulate file input
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    if (e.target.files.length > 0) {
                        showToast(`Screenshot "${e.target.files[0].name}" attached`, 'success');
                    }
                };
                input.click();
            }
        });
    });

    // 3. Demo Buttons (Component Row)
    const demoButtons = document.querySelectorAll('.component-row .btn');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.classList.contains('btn-primary') ? 'Primary' :
                btn.classList.contains('btn-secondary') ? 'Secondary' : 'Ghost';
            showToast(`${type} button interaction test`, 'info');
        });
    });

    // 4. Footer Checkbox Logic
    const checkboxes = document.querySelectorAll('.proof-item input[type="checkbox"]');
    const statusBadge = document.querySelector('.status-badge');

    function updateStatus() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

        if (checked === 0) {
            statusBadge.textContent = 'Not Started';
            statusBadge.className = 'status-badge status-not-started';
            statusBadge.style.background = '#e0e0e0';
            statusBadge.style.color = 'var(--text-secondary)';
            statusBadge.style.border = '1px solid #ccc';
        } else if (checked === total) {
            statusBadge.textContent = 'Shipped';
            statusBadge.className = 'status-badge status-shipped';
            statusBadge.style.background = 'var(--success-bg)';
            statusBadge.style.color = 'var(--success-color)';
            statusBadge.style.border = '1px solid var(--success-color)';
        } else {
            statusBadge.textContent = 'In Progress';
            statusBadge.className = 'status-badge status-in-progress';
            statusBadge.style.background = 'var(--warning-bg)';
            statusBadge.style.color = 'var(--warning-color)';
            statusBadge.style.border = '1px solid var(--warning-color)';
        }
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateStatus);
    });
});
