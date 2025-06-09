document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');
        
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('no-scroll');

        // Animate Hamburger Icon
        hamburger.classList.toggle('toggle');
    });
    
    // Close nav when a link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                document.body.classList.remove('no-scroll');
                hamburger.classList.remove('toggle');
            }
        });
    });
});

let count = localStorage.getItem('visitCount') || 0;
count++;
localStorage.setItem('visitCount', count);
document.getElementById('visitorCount').innerText = `You've visited this site ${count} times.`;

 const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {

            const wasActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    const backToTopBtn = document.getElementById('backToTop');

window.onscroll = () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};

backToTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

//Puter.js implementation

document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.querySelector('#chatInput');
  const chatForm = document.querySelector('#chatForm');
  const chatDisplay = document.querySelector('#chatDisplay');

  let systemPrompt = "";
  let contextReady = false;
  let chatHistory = [];

  // Show loading message while context loads
  addMessage("⏳ Loading YegnaBot...", 'received');

  // Load context.txt
  fetch('context.txt')
    .then(res => res.text())
    .then(context => {
      systemPrompt = context;
      contextReady = true;
      chatHistory = [{ role: 'system', content: systemPrompt }];

      // Replace loading with welcome message
      addMessage("👋 Hi, I’m YegnaBot! Ask me anything about our platform — try 'What can I sell here?' or 'How do I list a service?'", 'received');
    })
    .catch(() => {
      addMessage("⚠️ Failed to load assistant context. Please refresh.", 'received');
    });

  // Add chat message to UI
  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.classList.add('message', type);
    msg.textContent = text;
    chatDisplay.appendChild(msg);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }

  // Chat form submit
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!contextReady) {
      addMessage("⚠️ Still loading... please wait.", 'received');
      return;
    }

    const userText = chatInput.value.trim();
    if (!userText) return;

    addMessage(userText, 'sent');
    chatHistory.push({ role: 'user', content: userText });
    chatInput.value = '';

    try {
      const response = await puter.ai.chat(chatHistory, {
        model: 'gpt-4o'
      });

      let reply = response?.message?.content || response?.content || 'Sorry, I could not respond right now.';
      chatHistory.push({ role: 'assistant', content: reply });
      addMessage(reply, 'received');

    } catch (err) {
      console.error('AI Error:', err);
      addMessage("❌ Oops! I couldn't get a response. Please try again.", 'received');
    }
  });
});

