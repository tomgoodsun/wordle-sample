((window, document, wordList) => {
  'use strict';

  const config = {
    length: 5,
    maxTryCount: 10,
    targetWord: '',
  };
  let tryCount = 0;
  let remainingTryCount = config.maxTryCount;
  const wordInput = document.getElementById('answer');

  /**
   * Generate random integer
   *
   * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   * @param {Number} min
   * @param {Number} max
   * @returns Number
   */
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Initialize
   */
  const init = () => {
    // Initialize word
    const targetWord = wordList[getRandomInt(0, wordList.length)];
    config.targetWord = targetWord;
    console.log('targetWord:', targetWord);

    // Initialize form controls
    wordInput.minLength = config.length;
    wordInput.maxLength = config.length;

    // Initialize events
    document.getElementById('check').addEventListener('click', (e) => {
      const word = wordInput.value;
      judgeWord(word);
    });

    // Initialize try count
    updateTryCount();
  };

  /**
   * Check if all characters are correct
   *
   * @param {object} result
   * @return {boolean}
   */
  const isAllCorrect = (result) => {
    return result.every((r) => r.isCorrect);
  }

  /**
   * Convert result object to HTML string
   *
   * @param {object} result
   * @returns
   */
  const toHtml = (result) => {
    const chars =  result.map((r) => {
      const className = r.isCorrect ? 'correct' : (r.isIncluded ? 'included' : '');
      return `<span class="char ${className}">${r.char}</span>`;
    }).join('');
    return `<div id="result-line-${tryCount}" class="result-line">${chars}</div>`;
  };

  /**
   * Update try count view
   */
  const updateTryCount = () => {
    document.getElementById('try-count').innerText = `${remainingTryCount}`;
  };

  /**
   * Judge word
   *
   * @param {string} word
   */
  const judgeWord = (word) => {
    if (remainingTryCount <= 0) {
      alert('Game Over');
      return;
    }
    if (word.length !== config.length) {
      alert(`Length is not ${config.length}`);
      return;
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

    document.getElementById('result-area').innerHTML += toHtml(result);

    tryCount++;
    remainingTryCount--;
    updateTryCount();

    // wait for rendering
    setTimeout(() => {
      if (isAllCorrect(result)) {
        alert('Congratulations!');
      } else {
        if (remainingTryCount <= 0) {
          alert('Game Over');
        }
      }
      wordInput.focus();
    }, 0);
  };

  init();

})(window, document, wordList);
