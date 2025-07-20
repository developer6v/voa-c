document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const phoneInputField = document.querySelector("#field\\[7\\]");
        let utms = {
        "utm_source": "field[1]",
        "utm_medium": "field[2]",
        "utm_campaign": "field[3]",
        "utm_content": "field[4]"
    };

    for (const [utmKey, fieldName] of Object.entries(utms)) {
        const valor = urlParams.get(utmKey);
                console.log(valor);
        if (valor) {
        const inputHidden = document.getElementsByName(fieldName)[0];
        if (inputHidden) inputHidden.value = valor;
        }
    }



  const phoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: "auto",
      separateDialCode: true,
      preferredCountries: ["br", "us", "ca", "gb", "de", "fr", "pt", "jp"],
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  function setCountryByIP() {
      fetch("https://ipinfo.io/json?token=bda67caaa3f85b")
          .then(response => response.json())
          .then(data => {
              if (data && data.country) {
                  const countryCode = data.country.toLowerCase();
                  phoneInput.setCountry(countryCode);
              } else {
                  phoneInput.setCountry("br");
              }
          })
          .catch(error => {
              phoneInput.setCountry("br");
          });
  }

  setCountryByIP();

  let maxDigits = 15;
  let lastValue = ""; 



  function applyPhoneMask(event) {
      const countryData = phoneInput.getSelectedCountryData();
      const countryCode = countryData.iso2.toUpperCase();
      let rawNumber = phoneInputField.value.replace(/\D/g, ""); 

      const maxDigits = getMaxDigitsForCountry(countryCode);

      if (rawNumber.length > maxDigits) {
          event.preventDefault();
          rawNumber = rawNumber.substring(0, maxDigits);
      }

      let formattedNumber = "";
      try {
          formattedNumber = new libphonenumber.AsYouType(countryCode).input(rawNumber);
      } catch (error) {
          formattedNumber = rawNumber;
      }

      if (event && event.inputType === "deleteContentBackward") {
          lastValue = phoneInputField.value;
          return;
      }

      phoneInputField.value = formattedNumber;
      lastValue = formattedNumber;
  }


  function getMaxDigitsForCountry(countryCode) {
      const countryMaxDigits = {
          US: 10, 
          CA: 10, 
          BR: 11, 
          GB: 10, 
          FR: 9,  
          DE: 11, 
          IN: 10, 
          MX: 10, 
          AU: 9, 
          JP: 10, 
          PT: 9
      };

      return countryMaxDigits[countryCode] || 15; 
  }



  phoneInputField.addEventListener("keydown", function (event) {
      const rawNumber = phoneInputField.value.replace(/\D/g, "");

      if (rawNumber.length >= maxDigits && event.keyCode >= 48 && event.keyCode <= 57) {
          event.preventDefault();
      }
  });

  phoneInputField.addEventListener("keypress", function (event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
          event.preventDefault();
      }
  });

  phoneInputField.addEventListener("paste", function (event) {
      event.preventDefault();
      let pastedText = (event.clipboardData || window.clipboardData).getData("text");
      phoneInputField.value = pastedText.replace(/\D/g, "").substring(0, maxDigits);
      applyPhoneMask();
  });

  phoneInputField.addEventListener("countrychange", function () {
      phoneInputField.value = "";
      lastValue = "";
      applyPhoneMask();
  });

  phoneInputField.addEventListener("input", applyPhoneMask);


 window.clicou_form_pag = function (event) {
    event.preventDefault();

    const email_digitado = document.getElementById("email");
    const zap_digitado = document.getElementById("field[7]");
    let url = document.querySelector(".urlCheckout").getAttribute('data-url');



    if (!zap_digitado.value.trim()) {
        alert("Por favor, preencha o número de WhatsApp.");
        return 0;
    }


    /*
    if (!phoneInput.isValidNumber()) {
      alert("Insira um número de telefone válido!");
      return false;
    }
      */

    // valida e-mail
    const re = /\S+@\S+\.\S+/;
    const check_email = re.test(email_digitado.value);
    if (!check_email) {
      alert("Digite um email válido!");
      return false;
    }


    // preenche field[1] com número completo formatado
    const zap_envio = document.getElementsByName("field[7]")[0];
    const numero_completo = phoneInput.getNumber(); // formato internacional E.164
    zap_envio.value = numero_completo.replace(/[^0-9]/g, ''); // somente números

    // coleta UTMs da URL
    const urlParams = new URLSearchParams(window.location.search);

    let utms = {
      "utm_source": "field[1]",
      "utm_medium": "field[2]",
      "utm_campaign": "field[3]",
      "utm_content": "field[4]"
    };

    for (const [utmKey, fieldName] of Object.entries(utms)) {
      const valor = urlParams.get(utmKey);
              console.log(valor);
      if (valor) {
        const inputHidden = document.getElementsByName(fieldName)[0];
        if (inputHidden) inputHidden.value = valor;
      }
    }


    //document.getElementById("_form_1_").submit();

    const sck = [
        urlParams.get("utm_source"),
        urlParams.get("utm_medium"),
        urlParams.get("utm_campaign"),
        urlParams.get("utm_content"),
        urlParams.get("utm_term")
    ].join('|');

    
    if (!url || url == "") {
        url = "https://pay.hotmart.com/G100576922A?off=6mshjz42&checkoutMode=10";
    } 

    const rastreio = url +
    `&sck=${sck}` +
    `&utm_source=${urlParams.get("utm_source")}` +
    `&utm_medium=${urlParams.get("utm_medium")}` +
    `&utm_campaign=${urlParams.get("utm_campaign")}` +
    `&utm_content=${urlParams.get("utm_content")}` +
    `&utm_term=${urlParams.get("utm_term")}` +
    `&email=${email_digitado.value}` +
    `&phoneac=${numero_completo}`;

    console.log(utms);

    fetch("https://fabiocostaonline.activehosted.com/proc.php", {
        method: "POST",
        body: new FormData(document.getElementById("_form_37_")),
        mode: "no-cors"

    }).then(() => {
        window.location.href = rastreio;
    });
  }



  // SWIPER DEPOIMENTOS
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: true,
        },
    });




    // FAQ
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains("active");

      // Fecha todos os outros
      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));

      // Abre o atual se não estava aberto
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });


  // Rolagem Hero 
    Marquee3k.init();



    // Botão Fixo
    const botaoFixo = document.getElementById("botao-fixo");
    const rodape = document.querySelector("footer");
    const pricing = document.querySelector("#pricing");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const rodapeTop = rodape.offsetTop;

        const pricingRect = pricing.getBoundingClientRect();
        const pricingTop = pricingRect.top;
        const pricingBottom = pricingRect.bottom;

        const isPricingVisible = pricingTop < windowHeight && pricingBottom > 0;

        // Exibe se passou de 200px, não chegou no rodapé e NÃO está na seção #pricing
        if (scrollY > 200 && scrollY + windowHeight < rodapeTop && !isPricingVisible) {
        botaoFixo.classList.add("show");
        } else {
        botaoFixo.classList.remove("show");
        }
    });



    // PopUp
    const botoes = document.querySelectorAll(".garantirparticipacaoopenform");
    const fechar = document.getElementById("fecharPopup");
    const overlay = document.getElementById("popupOverlay");

    // Adiciona evento de clique para todos os botões com a classe garantirparticipacao
    botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        overlay.style.display = "flex";
    });
    });

    // Evento para fechar o popup
    fechar.addEventListener("click", () => {
    overlay.style.display = "none";
    });

    // Fecha o popup ao clicar fora
    overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
    });




    // Navegação entre sessões por href
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
