import React, { useEffect } from 'react';
import '../style/Slider.css';

const slideData = [
    {
        src: '/images/food.jpg',
        title: 'Cucina Giapponese',
        copy: 'Scopri i sapori unici della cucina giapponese, dai piatti tradizionali come sushi e ramen alle prelibatezze moderne.'
      },
      {
        src: '/images/restaurant.jpg', 
        title: 'Ristoranti Autentici',
        copy: 'Visita ristoranti autentici in Giappone per un’esperienza gastronomica indimenticabile, dove tradizione e modernità si incontrano.'
      },
      {
        src: '/images/temple.jpg', 
        title: 'Templi Storici',
        copy: 'Esplora i templi storici del Giappone, testimoni di una ricca cultura e spiritualità, che offrono un rifugio di pace.'
      },
      {
        src: '/images/festival.jpg', 
        title: 'Festival Giapponesi',
        copy: 'Partecipa ai festival vivaci e colorati del Giappone, che celebrano tradizioni antiche e cultura contemporanea.'
      }
];

function Slider() {
  useEffect(() => {
    let autoplay = setInterval(nextSlide, 5000);
    return () => clearInterval(autoplay);
  }, []);

  const nextSlide = () => {
    const slides = document.querySelectorAll('.slide');
    const captions = document.querySelectorAll('.caption');
    
    slides[0].classList.remove('current');
    slides[0].classList.add('previous');
    slides[1].classList.remove('next');
    slides[1].classList.add('current');
    slides[2].classList.add('next');
    
    slides[slides.length - 1].classList.remove('previous');
    
    const tempSlide = slides[0];
    const tempCaption = captions[0];
    
    tempSlide.parentNode.appendChild(tempSlide);
    tempCaption.parentNode.appendChild(tempCaption);
  };

  return (
    <div className="slider-container">
      <div className="slides">
        {slideData.map((slide, index) => (
          <div key={index} className={`slide ${index === 0 ? 'current' : ''}`}>
            <div className="slide-image" style={{ backgroundImage: `url(${slide.src})` }}></div>
            <div className="caption">
              <h2>{slide.title}</h2>
              <p>{slide.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
