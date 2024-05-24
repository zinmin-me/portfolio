/*============== toggle icon navbar ===============*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*============== scroll sections active link ===============*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header a[href*=' + id + ']').classList.add('active');
            });
            if (id != "home") {
                document.getElementById('gotopbtn').style.visibility = "visible";
            } else {
                document.getElementById('gotopbtn').style.visibility = "hidden";
            }

        }


    });
    /*============== sticky navbar ===============*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*============== remove toggle icon adn navbar when click navbar link (scroll)  ===============*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};

/*============== scroll reveal   ===============*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.column-left .box h5, .column-right .box h5', { origin: 'top' });

ScrollReveal().reveal('.home__image, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });

ScrollReveal().reveal('.home-content h1, .about__image, .contactMe, .exp, .h3Services, .h3Testimonials', { origin: 'left' });
ScrollReveal().reveal('.column-left h2, .column-left .box p, .column-left .box ul li', { origin: 'left' });
ScrollReveal().reveal('.skills img, .services img, .contact img', { origin: 'left' });

ScrollReveal().reveal('.home-content p, .about-content, .column-right h2', { origin: 'right' });
ScrollReveal().reveal('.column-right h2, .column-right .box p, .column-right .box ul li', { origin: 'right' });
ScrollReveal().reveal('.career-box h4', { origin: 'right' });

/*============== typed js   ===============*/
const typed = new Typed('.multiple-text', {
    strings: ['Full-Stack Developer', 'Web Developer', 'Full-Stack .Net Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


/*============== career number count   ===============*/
let aboutSection = document.querySelector(".about");
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;



let CounterObserver = new IntersectionObserver((entries, observe) => {
    let [entry] = entries;
    if (!entry.isIntersecting) {
        // console.log("No Section");
        return;
    }
    valueDisplays.forEach((valueDisplay) => {
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute("data-val"));
        let duration = Math.floor(interval / endValue);
        let counter = setInterval(function() {
            startValue += 1;
            valueDisplay.textContent = startValue + "+";
            if (startValue == endValue) {
                clearInterval(counter);
            }
        }, duration);
    });
}, {
    root: null,
    threshold: 0.4,
});

CounterObserver.observe(aboutSection);


/*============== progress bar js   ===============*/
let skillsSection = document.querySelector('.skills');
const skills = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar div');
const spans = document.querySelectorAll('.progress-bar div span');

let skillsObserver = new IntersectionObserver((entries, observe) => {
    let [entry] = entries;
    if (!entry.isIntersecting) {
        progressBars.forEach(p => {
            p.style.opacity = 0;
            p.style.width = 0;
        });
        return;
    }
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;

        spans.forEach(span => {
            span.style.opacity = 1;
        });

        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`;

    });
}, {
    root: null,
    threshold: 0.4,
});

skillsObserver.observe(skillsSection);


/*============== Testimonials Section js   ===============*/
$('.testimonials-container').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTime: 6000,
    margin: 10,
    nav: true,
    navText: ["<i class='bx bx-left-arrow-alt' ></i>",
        "<i class='bx bx-right-arrow-alt' ></i>"
    ],
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        600: {
            items: 1,
            nav: true
        },
        768: {
            items: 2
        }
    }
});

/*============== Contact Form js   ===============*/
// let sendBtn = document.getElementById('sendBtn');
// sendBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log('hi');
//     let fullName = document.getElementById('fullName').value;
//     let email = document.getElementById('email').value;
//     let phoneNumber = document.getElementById('phoneNumber').value;
//     let subject = document.getElementById('subject').value;
//     let message = document.getElementById('message').value;

//     let body = 'Full Name: ' + fullName + '<br/> Email: ' + email + '<br/> Phone Number: ' + phoneNumber + '<br/> Subject: ' + subject + '<br/> Message: ' + message;


//     Email.send({
//         Host: "smtp.elasticemail.com",
//         Username: "zmin9720@gmail.com",
//         Password: "jsvcxojpcvcwqspu",
//         To: 'zinminzmo96@gmail.com',
//         From: email,
//         Subject: subject,
//         Body: body,
//     }).then(
//         message => alert(message)
//     );

// });

/*============== Contact Form js   ===============*/
let form = document.getElementById('form');

let fullName = document.getElementById('fullName');
let email = document.getElementById('email');
let phoneNumber = document.getElementById('phoneNumber');
let subject = document.getElementById('subject');
let message = document.getElementById('message');


form.addEventListener('submit', function(e) {

    e.preventDefault();
    sendMessage();

});


function sendMessage() {
    var params = {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        subject: subject.value,
        message: message.value,
    }
    emailjs.send("service_23frybi", "template_ztvio4u", params).then(function(res) {
        swal("Thank you!", "I will be in touch with you shortly!", "success");
    });
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}