     let selectedService = null;
     let selectedPrice = 0;

     function selectService(element, price) {
         // Remove selected class from all options
         document.querySelectorAll('.service-option').forEach(opt => {
             opt.classList.remove('selected');
         });

         // Add selected class to clicked option
         element.classList.add('selected');

         // Update selected service and price
         selectedService = element.querySelector('h3').textContent;
         selectedPrice = price;

         // Update order summary
         updateOrderSummary();
     }

     function updateOrderSummary() {
         document.getElementById('selected-service').textContent = selectedService || 'None';

         const subtotal = selectedPrice;
         const tax = subtotal * 0.1; // 10% tax
         const total = subtotal + tax;

         document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
         document.getElementById('tax').textContent = '$' + tax.toFixed(2);
         document.getElementById('total').textContent = '$' + total.toFixed(2);
     }

     function processPayment() {
         if (!selectedService) {
             alert('Please select a service before proceeding with payment.');
             return;
         }

         // Simple validation
         const cardName = document.getElementById('card-name').value;
         const cardNumber = document.getElementById('card-number').value;
         const cardExpiry = document.getElementById('card-expiry').value;
         const cardCvc = document.getElementById('card-cvc').value;

         if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
             alert('Please fill in all payment details.');
             return;
         }

         // Disable pay button to prevent multiple clicks
         const payButton = document.getElementById('pay-button');
         payButton.disabled = true;
         payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

         // Simulate payment processing
         setTimeout(() => {
             // Show success message
             document.getElementById('success-message').classList.add('active');

             // Reset form
             resetForm();
         }, 2000);
     }

     function resetForm() {
         document.querySelectorAll('.service-option').forEach(opt => {
             opt.classList.remove('selected');
         });
         document.getElementById('selected-service').textContent = 'None';
         document.getElementById('subtotal').textContent = '$0.00';
         document.getElementById('tax').textContent = '$0.00';
         document.getElementById('total').textContent = '$0.00';
         document.querySelectorAll('input').forEach(input => input.value = '');

         selectedService = null;
         selectedPrice = 0;

         // Re-enable pay button
         const payButton = document.getElementById('pay-button');
         payButton.disabled = false;
         payButton.innerHTML = '<i class="fas fa-lock"></i> Complete Payment';

     }

     function goBackToHome() {
         // Hide success message
         document.getElementById('success-message').classList.remove('active');


         // Scroll to top of the page
         window.scrollTo({ top: 0, behavior: 'smooth' });
     }
     // Simple Intersection Observer for Fade-up Animation
     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.classList.add('visible');
             }
         });
     });

     document.querySelectorAll('.card, .hero-content, .text-reveal p').forEach((el) => {
         observer.observe(el);
     });