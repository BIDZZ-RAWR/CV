document.addEventListener('DOMContentLoaded', () => {
    // Fade-In Animation for Sections on Page Load
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-in-out';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 300);
    });

    // Scroll-Based Left-to-Right Animation for Other Sections
    const sectionsToAnimate = document.querySelectorAll(
        '.section.about, .section.profile, .section.contact, .section.education, ' +
        '.section.experience, .section.projects'
    );
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        section.classList.add('animate-on-scroll');
        sectionObserver.observe(section);
    });

    // Scroll-Based Animation for Skills List Items
    const skillsItems = document.querySelectorAll('.skills-list li');
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add visible class with a staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // 150ms delay per item
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillsItems.forEach(item => {
        skillsObserver.observe(item);
    });

    // Contact Form Submission (WhatsApp)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate inputs
        if (!name || !email || !message) {
            alert('Harap isi semua kolom formulir dengan lengkap.');
            return;
        }

        // WhatsApp message format
        const whatsappMessage = `Subject: Pesan Baru dari ${name}\n\nHalo Muhammad Abid,\n\nPesan baru dari kontak:\n- Nama: ${name}\n- Email: ${email}\n- Pesan: ${message}\n\nBalas secepatnya ya!`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = '6282350265164';
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        // Open WhatsApp
        try {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
            alert('Pesan berhasil dikirim via WhatsApp!');
        } catch (err) {
            console.error('Failed to open WhatsApp:', err);
            alert('Gagal membuka WhatsApp. Silakan coba lagi atau gunakan opsi email.');
        }
    });

    // Email Button Handler
    const emailBtn = document.getElementById('email-btn');
    emailBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Harap isi semua kolom formulir dengan lengkap.');
            return;
        }

        const emailSubject = encodeURIComponent(`Pesan dari ${name} via CV`);
        const emailBody = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\nPesan: ${message}`);
        const emailUrl = `mailto:squadofthehervian@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        try {
            window.location.href = emailUrl;
            contactForm.reset();
            alert('Pesan siap dikirim via email!');
        } catch (err) {
            console.error('Failed to open email client:', err);
            alert('Gagal membuka email. Silakan kirim secara manual ke squadofthehervian@gmail.com.');
        }
    });
});