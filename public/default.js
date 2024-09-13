((window, document, wordList) => {
  'use strict';

  const config = {
    length: 5,
    maxTryCount: 10,
    targetWord: '',
  };
  let isFinished, isStarted, timeSec, timeStr, tryCount;
  let remainingTryCount = config.maxTryCount;
  const wordInput = document.getElementById('answer');

  /**
   * Add zero padding to number
   *
   * @param {Number} length
   * @return string
   */
  Number.prototype.zeroFill = function (length) {
    return ('0'.repeat(length) + this.toString()).slice(-length);
  };

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
    const targetWord = wordList[getRandomInt(0, wordList.length - 1)].toUpperCase();
    config.targetWord = targetWord;
    console.log('targetWord:', targetWord);

    // Reset game
    reset();

    // Initialize form controls
    wordInput.minLength = config.length;
    wordInput.maxLength = config.length;

    // Initialize events
    document.getElementById('check').addEventListener('click', (e) => {
      judgeWord(wordInput.value);
    });
    wordInput.addEventListener('keydown', (e) => {
      console.log('keydown:', e.key);
      if ('Enter' === e.key) {
        judgeWord(wordInput.value);
      }
    });
    wordInput.addEventListener('change', (e) => {
      console.log('change:', e.target.value);
      if (!isStarted) {
        isStarted = true;
        setTimeout(updateTimer, 1000);
      }
    });

    // Initialize try count
    updateTryCount();
  };

  /**
   * Reset game
   */
  const reset = () => {
    isFinished = false;
    isStarted = false;
    timeSec = 0;
    timeStr = '00:00:00';
    tryCount = 0;
    remainingTryCount = config.maxTryCount;
    document.getElementById('result-area').innerHTML = '';
    document.getElementById('answer-check').innerHTML = '';
    updateTryCount();
  }

  /**
   * Update timer
   */
  const updateTimer = () => {
    if (isStarted) {
      timeSec++;
      let hrs = Math.floor(timeSec / 3600).zeroFill(2);
      let min = Math.floor((timeSec % 3600) / 60).zeroFill(2);
      let sec = (timeSec % 60).zeroFill(2);
      timeStr = `${hrs}:${min}:${sec}`;
      document.getElementById('clear-time').innerText = timeStr;
      setTimeout(updateTimer, 1000);
    }
  };

  /**
   * Check if all characters are correct
   *
   * @param {object} result
   * @return {boolean}
   */
  const isAllCorrect = (result) => {
    if (0 === result.length) {
      return false;
    }
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
    return `<div id="result-line-${tryCount}" class="result-line">${chars}<span class="time">${timeStr}</span></div>`;
  };

  /**
   * Update try count view
   */
  const updateTryCount = () => {
    document.getElementById('try-count').innerText = `${remainingTryCount}`;
  };

  /**
   * Check if game is over or not
   *
   * @param {boolean} useAlert
   * @returns {boolean}
   */
  const checkGameOver = (useAlert) => {
    if (isFinished) {
      return true;
    }
    if (remainingTryCount <= 0) {
      isFinished = true;
      isStarted = false;
      if (useAlert) {
        alert('Game Over');
        document.getElementById('answer-check').innerHTML
          = `Answer: <span class="answer-word">${config.targetWord}</span>`;
      }
      return true;
    }
    return false;
  };

  /**
   * Check input word
   *
   * @param {string} word
   */
  const validateWord = (word) => {
    if (word.length !== config.length) {
      throw new Error(`Length is not ${config.length}`);
    }
    if (!word.match(/^[a-zA-Z]+$/)) {
      throw new Error('Only alphabets are allowed');
    }
  }

  /**
   * Gather match result
   *
   * @param {string} word
   */
  const gatherMatchResult = (word) => {
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
    return result;
  };

  /**
   * Judge word
   *
   * @param {string} word
   */
  const judgeWord = (word) => {
    word = word.toUpperCase();

    try {
      if (checkGameOver(false)) {
        return;
      }
      validateWord(word);
    } catch (e) {
      console.error(e);
      alert(e.message);
      return;
    }
    const result = gatherMatchResult(word);
    document.getElementById('result-area').innerHTML += toHtml(result);

    tryCount++;
    remainingTryCount--;
    updateTryCount();

    // wait for rendering
    setTimeout(() => {
      if (isAllCorrect(result)) {
        isFinished = true;
        isStarted = false;
        alert('Congratulations!');
      } else {
        checkGameOver(true);
      }
      wordInput.focus();
    }, 0);
  };

  init();

})(window, document, wordList);
