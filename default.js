((window, document, wordList) => {
  'use strict';

  const config = {
    length: 5,
    targetWord: '',
  };
  const wordInput = document.querySelector('.word');

  /**
   * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   * @param {Number} min
   * @param {Number} max
   * @returns Number
   */
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const init = () => {
    // Initialize word
    const targetWord = wordList[getRandomInt(0, wordList.length)];
    config.targetWord = targetWord;
    console.log('targetWord:', targetWord);

    // Initialize form controls
    wordInput.minLength = config.length;
    wordInput.maxLength = config.length;

    // Initialize events
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const word = wordInput.value;
        judgeWord(word);
      });
    });
  };

  const isAllCorrect = (result) => {
    return result.every((r) => r.isCorrect);
  }

  const toHtml = (result) => {
    return result.map((r) => {
      const className = r.isCorrect ? 'correct' : (r.isIncluded ? 'included' : '');
      return `<span class="char ${className}">${r.char}</span>`;
    }).join('');
  };

  const judgeWord = (word) => {
    if (word.length !== config.length) {
      throw new Error('length is not 5');
    }

    const result = [];

    for (let i = 0; i < word.length; i++) {
      const matchResult = {
        char: word[i],
        isCorrect: false,
        isIncluded: false,
      };

      if (matchResult.char === config.targetWord[i]) {
        matchResult.isCorrect = true;
      } else if (config.targetWord.includes(word[i])) {
        matchResult.isIncluded = true;
      }
      result.push(matchResult);
    }

    document.getElementById('result-area').innerHTML += '<div class="result-line">' + toHtml(result) + '</div>';

    // wait for rendering
    if (isAllCorrect(result)) {
      setTimeout(() => {
        alert('Congratulations!');
      }, 0);
    }
  };

  init();

})(window, document, wordList);
