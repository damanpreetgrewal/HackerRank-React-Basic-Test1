import React, { useState, useEffect } from 'react';

const Slides = ({ slides }) => {
  const [slide, setSlide] = useState(slides[0]);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableRestart, setDisableRestart] = useState(true);

  //Total Slides
  const SlidesMaxIndex = slides.length - 1;

  useEffect(() => {
    const curIdx = slides.findIndex(item => item.title === slide.title);
    console.log(curIdx);

    if (curIdx === SlidesMaxIndex) {
      setDisableNext(true);
    } else if (curIdx === 0) {
      setDisablePrev(true);
      setDisableRestart(true);
    } else if (curIdx > 0 && curIdx < SlidesMaxIndex) {
      setDisableNext(false);
      setDisablePrev(false);
      setDisableRestart(false);
    }
  }, [slide.title,SlidesMaxIndex,slides]);

  const pass = numIdx => {
    setSlide(
      slides[slides.findIndex(item => item.title === slide.title) + numIdx]
    );
  };

  const restart = () => {
    setDisableNext(false);
    setDisablePrev(true);
    setDisableRestart(true);
    setSlide(slides[0]);
  };

  return (
    <div>
      <div id='navigation' className='text-center'>
        <button
          data-testid='button-restart'
          className='small outlined'
          onClick={restart}
          disabled={disableRestart}
        >
          Restart
        </button>
        <button
          data-testid='button-prev'
          className='small'
          onClick={() => pass(-1)}
          disabled={disablePrev}
        >
          Prev
        </button>
        <button
          data-testid='button-next'
          className='small outlined'
          onClick={() => pass(1)}
          disabled={disableNext}
        >
          Next
        </button>
      </div>
      <div id='slide' className='card text-center'>
        <h1 data-testid='title'>{slide.title}</h1>
        <p data-testid='text'>{slide.text}</p>
      </div>
    </div>
  );
};

export default Slides;
