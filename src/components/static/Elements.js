import React from 'react';
import '../style/Elements.css'

const CardSection = () => {
  return (
    <>
      <section className="light">
        <div className="container py-4">
          <article className="postcard light red">
            <a className="postcard__img_link">
              <img className="postcard__img" src="https://picsum.photos/501/500" alt="Image Title" />
            </a>
            <div className="postcard__text t-dark">
              <h1 className="postcard__title red">Podcast Title</h1>
              <div className="postcard__subtitle small">
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default CardSection;
