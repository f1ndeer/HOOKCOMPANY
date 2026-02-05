const PAYMENT_TOKEN = 'uEiDy1j-onMkDxGna4gl_Re1Y7Oya28yisHn0JNUiHrM';

let selectedService = null;
let selectedPrice = 0;
let selectedServiceName = '';

function selectService(element, price, name) {
    // Remove selected class
    document.querySelectorAll('.service-item').forEach(opt => {
        opt.classList.remove('selected');
    });

    // Add selected class
    element.classList.add('selected');

    // Update state
    selectedService = element;
    selectedPrice = price;
    selectedServiceName = name;

    // Update UI
    updateOrderSummary();
}

function updateOrderSummary() {
    document.getElementById('selected-service').textContent = selectedServiceName || 'NULL';

    const subtotal = selectedPrice;
    const tax = subtotal * 0.2; // 20% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2) + ' UAH';
}

function processPayment() {
    if (!selectedService) {
        alert('ERROR: SELECT CONFIGURATION FIRST.');
        return;
    }

    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;
    const clientCard = document.getElementById('client-card').value;

    if (!clientName || !clientEmail || !clientCard) {
        alert('ERROR: MISSING REQUIRED FIELDS.');
        return;
    }

    const payButton = document.getElementById('pay-button');
    payButton.disabled = true;
    payButton.innerHTML = 'PROCESSING...';

    const totalAmount = selectedPrice * 1.2;

    simulatePaymentProcessing(totalAmount);
}

function simulatePaymentProcessing(amount) {
    setTimeout(() => {
        const isSuccess = true;

        if (isSuccess) {
            document.getElementById('success-message').classList.add('active');
            resetForm();
        } else {
            alert('TRANSACTION FAILED. RETRY.');
            const payButton = document.getElementById('pay-button');
            payButton.disabled = false;
            payButton.innerHTML = 'EXECUTE PAYMENT';
        }
    }, 1500);
}

function resetForm() {
    document.querySelectorAll('.service-item').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById('selected-service').textContent = 'NULL';
    document.getElementById('subtotal').textContent = '0.00';
    document.getElementById('tax').textContent = '0.00';
    document.getElementById('total').textContent = '0.00 UAH';
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById('project-details').value = '';

    const payButton = document.getElementById('pay-button');
    payButton.disabled = false;
    payButton.innerHTML = 'EXECUTE PAYMENT';

    selectedService = null;
    selectedPrice = 0;
    selectedServiceName = '';
}

function goBackToHome() {
    document.getElementById('success-message').classList.remove('active');
    window.location.href = "../main/index.html";
}