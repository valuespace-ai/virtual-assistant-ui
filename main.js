import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

        function groupImages() {
            const imageContainers = document.querySelectorAll('.chat-message-markdown ol');
            imageContainers.forEach(container => {
                const imageElements = container.querySelectorAll('li img');
                if (imageElements.length >= 4) {
                    const imageGrid = document.createElement('div');
                    imageGrid.className = 'image-grid';

                    for (let i = 0; i < 4; i++) {
                        const imgWrapper = document.createElement('div');
                        if (i === 3 && imageElements.length > 4) {
                            imgWrapper.className = 'more-images';
                            imgWrapper.setAttribute('data-count', `+${imageElements.length - 3}`);
                        }
                        imgWrapper.appendChild(imageElements[i].cloneNode(true));
                        imageGrid.appendChild(imgWrapper);
                    }

                    container.innerHTML = '';
                    container.appendChild(imageGrid);

                    const hiddenImages = document.createElement('div');
                    hiddenImages.className = 'hidden-images';
                    for (let i = 4; i < imageElements.length; i++) {
                        hiddenImages.appendChild(imageElements[i].cloneNode(true));
                    }
                    container.appendChild(hiddenImages);
                } else {
                    imageElements.forEach(img => {
                        if (!img.closest('.image-grid')) {
                            const altText = img.alt;
                            if (altText) {
                                const caption = document.createElement('div');
                                caption.className = 'image-caption';
                                caption.textContent = altText;
                                img.insertAdjacentElement('afterend', caption);
                            }
                        }
                    });
                }
            });
        }

        console.log(`%cValueSpace.ai\n%cAI-powered hotel chatbot, \u00A9 ${(new Date).getFullYear()} ValueSpace.ai\n visit https://valuespace.ai`, "color:#c93656;font-weight:bolder;font-family:Montserrat,sans-serif;font-size:40px;text-shadow:-1px 0 #1b2f5d,0 1px #1b2f5d,1px 0 #1b2f5d,0 -1px #1b2f5d;", "font-weight:bolder;");

        createChat({
            webhookUrl: 'https://valuespace.app.n8n.cloud/webhook/b0cd5e28-a448-47de-b150-9d244d37e270/chat',
            mode: 'window',
            metadata: { project: 'vesperworld' },
            showWelcomeScreen: false,
            initialMessages: [
                'Hi there! \uD83D\uDC4B',
                'My name is Lujo. How can I assist you today?',
            ],
            i18n: {
                en: {
                    title: 'Hi there! \uD83D\uDC4B',
                    subtitle: "Start a chat. We're here to help you 24/7.",
                    footer: 'Checking bot compliance rules <link here...>',
                    getStarted: 'New Conversation',
                    inputPlaceholder: 'Type your question..',
                },
            },
            allowFileUploads: true,
            allowedFilesMimeTypes: '.pdf;.doc;.docs;.txt;.png;.jpg;.jpeg',
        });

        let currentImageIndex = 0;
        let images = [];
        let swiper;

        window.openModalImageViewer = function (index) {
			currentImageIndex = index;
            const swiperWrapper = document.getElementById('swiperWrapper');
            swiperWrapper.innerHTML = ''; // Clear existing slides
            images.forEach((img, i) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                const expoContainer = document.createElement('div');
                expoContainer.className = 'expo-container';
                const imageElement = document.createElement('img');
                imageElement.className = 'expo-image';
                imageElement.src = img.src;
                expoContainer.appendChild(imageElement);
                if (img.alt) {
                    const expoContent = document.createElement('div');
                    expoContent.className = 'expo-content';
                    expoContent.textContent = img.alt;
                    expoContainer.appendChild(expoContent);
                }
                slide.appendChild(expoContainer);
                swiperWrapper.appendChild(slide);
            });
			
			console.log("swiper:" + swiper);
			if (swiper) {
			   console.log("swiper.update();");
			   swiper.update();
			   //swiper.changeDirection();
			   swiper.slideTo(currentImageIndex, 0, false);
			}
			
            document.getElementById('modalImageViewer').classList.add('modal-active');
            const chatWindowToggle = document.querySelector('.chat-window-toggle');
			
			document.querySelector('.toggle-nav-buttons').addEventListener('click', () => {
			const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
				navButtons.forEach(button => {
					button.style.display = 'flex';
				});
			});
			
            if (chatWindowToggle) chatWindowToggle.click();
        }

        window.closeModalImageViewer = function () {
            document.getElementById('modalImageViewer').classList.remove('modal-active');
            const chatWindowToggle = document.querySelector('.chat-window-toggle');
			
			document.querySelector('.toggle-nav-buttons').addEventListener('click', () => {
			const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
				navButtons.forEach(button => {
					button.style.display = 'none';
				});
			});
		
            if (chatWindowToggle) chatWindowToggle.click();
        }

        document.addEventListener('click', function (event) {
            if (event.target.tagName === 'IMG' && event.target.closest('.chat-message')) {
                images = Array.from(document.querySelectorAll('.chat-message img'));
                const clickedImageIndex = images.indexOf(event.target);
                openModalImageViewer(clickedImageIndex);
            } else if (event.target.closest('.more-images')) {
                images = Array.from(document.querySelectorAll('.chat-message img'));
                openModalImageViewer(3);
            }
        });

        const chatMessagesContainer = document.querySelector('.chat-messages-list');
        const observer = new MutationObserver(() => {
            images = Array.from(document.querySelectorAll('.chat-message img'));
            groupImages();
			});

        observer.observe(chatMessagesContainer, { childList: true, subtree: true });

   // Initialize Swiper only if it's not already initialized
   if (!swiper) {
			console.log("init swiper");
		swiper = new Swiper('.swiper', {
				  direction: 'horizontal',
				  // pass EffectExpo module to modules
				  modules: [EffectExpo],
				  // specify "expo" effect
				  effect: 'expo',
				  // "expo" effect mainly design to work with slidesPerView: 1.5
				  slidesPerView: 1.5,
				  // "expo" effect parameters
				  expoEffect: {
					// image scale multiplier, 1.125 is minimum
					imageScale: 1.125,
					// image offset multiplier, recommended to increase for slidesPerView > 2 for better parallax effect
					imageOffset: 1.25,
					// side slides scale multiplier, 1.25 is the minimum
					scale: 1.25,
					// side slides rotate angle (in degrees)
					rotate: 30,
					// side slides grayscale effect
					grayscale: true,
				  },
				   navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				  },
				  grabCursor: true,
				  spaceBetween: 16,
				  breakpoints: {
					768: {
					  spaceBetween: 32,
					},
				  },
				});
				
		
		// Demo Buttons
		const buttonVertical = document.querySelector('.demo-nav button[data-direction="vertical"]')
		const buttonHorizontal = document.querySelector('.demo-nav button[data-direction="horizontal"]')
		buttonHorizontal.addEventListener('click', () => {
		  if (swiper.params.direction === 'horizontal') return;
		  buttonVertical.classList.remove('active')
		  buttonHorizontal.classList.add('active')
		  swiper.changeDirection();
		  swiper.originalParams.direction = 'horizontal'
		})
		buttonVertical.addEventListener('click', () => {
		  if (swiper.params.direction === 'vertical') return;
		  buttonVertical.classList.add('active')
		  buttonHorizontal.classList.remove('active')
		  swiper.changeDirection();
		  swiper.originalParams.direction = 'vertical'
		})
		document.querySelector('.demo-nav-rotate').addEventListener('click', (e) => {
		  const buttonEl = e.target.closest('button')
		  if (buttonEl.classList.contains('active')) {
			swiper.params.expoEffect.rotate = 0
			swiper.originalParams.expoEffect.rotate = 0
			buttonEl.classList.remove('active')
		  } else {
			swiper.params.expoEffect.rotate = 30
			swiper.originalParams.expoEffect.rotate = 30
			buttonEl.classList.add('active')
		  }
		  swiper.update()
		})
		document.querySelector('.demo-nav-theme').addEventListener('click', (e) => {
		  document.body.classList.toggle('light')
		  e.target.closest('button').classList.toggle('active')
		})
		document.querySelector('.demo-nav-content').addEventListener('click', (e) => {
		  document.body.classList.toggle('content-visible')
		  e.target.closest('button').classList.toggle('active')
		})
		
		const buttonSwitchArrows = document.querySelector('.toggle-nav-buttons');
		buttonSwitchArrows.addEventListener('click', () => {
		if (buttonSwitchArrows.classList.contains('active'))
		{
			buttonSwitchArrows.classList.remove('active');
		}
		else
		{
			buttonSwitchArrows.classList.add('active');
		}
		const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
			navButtons.forEach(button => {
				button.style.display = button.style.display === 'none' ? 'flex' : 'none';
			});
		});

		// Ensure buttons are hidden on small screens
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		function handleMediaChange(e) {
			const navButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
			if (e.matches) {
				navButtons.forEach(button => {
					button.style.display = 'none';
				});
			} else {
				navButtons.forEach(button => {
					button.style.display = 'flex';
					if (buttonSwitchArrows.classList.contains('active'))
					{
						button.style.display = 'flex';
					}
				})
			}
		}
		mediaQuery.addListener(handleMediaChange);
		handleMediaChange(mediaQuery);
	   
   };	
   