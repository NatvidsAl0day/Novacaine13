var ValidatePaymentGateways = {
    isPaymentTotalZero: function() {
        return parseFloat(JotForm.paymentTotal) === 0;
    },
    validate: function(type) {
        if (this.isPaymentTotalZero()) {
            return true;
        }
        switch (type) {
            case 'stripe':
                return this.validateStripe();
            case 'square':
                return this.validateSquare(true);
            case 'mollie':
                return this.validateMollie(true);
            default:
                return true;
        }
    },
    validateMollie: function() {
        const paymentField = document.querySelectorAll('[data-payment]');
        if (JotForm.isPaymentSelected() && paymentField.length > 0 && JotForm.isVisible(paymentField[0])) {
            let mollieRadio = document.getElementsByName('mollie-payment-method');
            let paymentSelected = false;
            if (!!window.CardForm) {
                mollieRadio = document.getElementsByName('radio-apm-cardform');
            }
            for (var i = 0; i < mollieRadio.length; i++) {
                if (mollieRadio[i].type === 'radio' && mollieRadio[i].checked) {
                    paymentSelected = true;
                }
            }
            if (!paymentSelected) {
                JotForm.errored($('mollie_dummy'), 'Please fill up the payment method.');
                return false;
            }
        }
        return true;
    },
    validateStripe: function() {
        if (!JotForm.stripe) {
            return true;
        }
        const paymentField = this.getPaymentField();
        const isPaymentFieldRequired = this.isPaymentFieldRequired();
        if (!JotForm.isPaymentSelected() && paymentField && !isPaymentFieldRequired) {
            return true;
        }
        const isSignEnabledOnForm = window.JotForm.useJotformSign === 'Yes';
        if (isSignEnabledOnForm && !JotForm.isPaymentSelected() && JotForm.isSectionTouched(JotForm.getSection(paymentField)) !== true) {
            // checks payment field for hidden cases to skip unnecessary stripe validation
            return true;
        }
        if (!JotForm.stripe.isCardDataValid) {
            JotForm.errored($('stripesca_dummy'), 'Please fill up the credit card details');
        }

        if (isPaymentFieldRequired) {
            const ccFirstName = paymentField.querySelector('[data-component="cc_firstName"]');
            const ccLastName = paymentField.querySelector('[data-component="cc_lastName"]');

            // in case of name field is null pass this validation
            if ((ccFirstName && ccFirstName.value === '') || (ccLastName && ccLastName.value === '')) {
                JotForm.errored($('stripesca_dummy'), 'Please fill up the credit card details');
                return false;
            }
        }
        // only subscription has email field
        if (window.paymentType === 'subscription' && JotForm.isPaymentSelected()) {
            const cc_email = paymentField.querySelector('.cc_email');
            if (cc_email !== null && cc_email.value.length === 0) {
                JotForm.errored($('stripesca_dummy'), 'Email is required.');
            }
            const isEmailValid = cc_email === null ? true : this.emailRegex().test(cc_email.value);
            if (!isEmailValid) {
                JotForm.errored($('stripesca_dummy'), 'Enter a valid e-mail address');
                return false;
            }
        }
        return JotForm.stripe.isCardDataValid;
    },
    validateSquare: function(throwFromError) {
        try {
            var paymentField = $$('[data-payment="true"]')[0];
            if (JotForm.payment === 'square' && JotForm.isPaymentSelected() && JotForm.squarePayment.getSelectedPM() === '') {
                JotForm.corrected(paymentField);
                JotForm.errored(paymentField, "Please select one payment method");
                return false;
            }
            if (JotForm.payment !== 'square' || !JotForm.isPaymentSelected() || JotForm.squarePayment.getSelectedPM() !== 'creditcard') {
                return true;
            }
            var ccFirstName = document.querySelector('.cc_firstName');
            var ccLastName = document.querySelector('.cc_lastName');
            var squareCardState = typeof JotForm.squarePayment.squareCardEvent !== 'undefined' ? JotForm.squarePayment.squareCardEvent : null;
            var isCorrected = true;
            if (ccFirstName.value === '' || ccLastName.value === '' || squareCardState === null) {
                isCorrected = false;
            }
            if (squareCardState !== null && typeof squareCardState.detail !== 'undefined' && !squareCardState.detail.currentState.isCompletelyValid) {
                isCorrected = false;
            }
            if (throwFromError && !isCorrected) {
                JotForm.corrected(paymentField);
                JotForm.errored(paymentField, JotForm.texts.ccMissingDetails);
            }
            return isCorrected;
        } catch (e) {
            // If javascript throw exception, validation is disabled
            console.log('validateSquare ::: ', e);
            return true;
        }
    },
    emailRegex: function() {
        return /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/i;
    },
    getPaymentField: function() {
        const fpc = $$('input[name="simple_fpc"]')[0];
        return fpc && fpc.up('.form-line');
    },
    isPaymentFieldRequired: function() {
        let isPaymentFieldRequired = false;
        if (this.getPaymentField()) {
            if (!!window.CardForm) {
                if (this.getPaymentField().select('.jfRequiredStar') &&
                    this.getPaymentField().select('.jfRequiredStar').length > 0 &&
                    this.getPaymentField().select('.jfRequiredStar')[0].style.display !== 'none'
                ) {
                    // if payment field has jfRequiredStar and it is not hidden in cardform
                    isPaymentFieldRequired = true;
                }
            } else {
                if (this.getPaymentField().querySelector('label').querySelector('span')) {
                    const paymentFieldLabel = this.getPaymentField().querySelector('label').querySelector('span');
                    if (paymentFieldLabel && paymentFieldLabel.classList.contains('form-required')) {
                        isPaymentFieldRequired = true;
                    }
                }
            }
        }
        return isPaymentFieldRequired;
    }
};