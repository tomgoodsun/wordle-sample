/**
 * JavaScriptでWordleゲームを作成する
 *
 * Wordleゲームは、5文字の単語を当てるゲームです。
 * 入力されたアルファベット5文字のうち、正しい位置に正しい文字があれば「正解」、位置は違うが正しい文字があれば「含まれる」、それ以外は「不正解」として表示します。
 * 10回以内に正解できればクリアです。
 * 本実装では以下のようにします。
 *
 * 01. 5文字の単語リストはwordListとして定義しているので、その中から正解となる単語をランダムに選択します。
 * 02. 10回以内に正解できればクリアです。
 * 03. 入力された単語が正しいかどうかは、位置と文字が正しいかどうかを判定します。
 * 04. 回答したも単語は`.result-line`で囲まれ、`.char`で1文字ずつ囲まれます。
 * 05. `.char`に正解：グリーン（`.correct`）、含まれる：イエロー（`.included`）、不正解：グレーで表示します。
 * 06. 回答入力フォームは5文字まで入力できるようにし、5文字に満たない場合はチェックをしません。
 * 07. 回答入力フォームはEnterキーでチェックできるようにします。
 * 08. 最初の回答を送信した時点でタイマーを開始します。タイマーは「hh:mm:ss」形式で表示し、1秒毎に更新します。
 * 09. 回答は右ペインにすたっくしていきますが、その際に開始からの経過時間も記録します。
 * 10. 正解している場合、10回でクリアしていない場合はゲームオーバーとします。その場合は操作できないようにします。
 * 11. クリアした場合は、アラートで「Congratulations!」と表示します。
 * 12. クリアでも未クリアでも正解の表示、タイマーの停止、プレイできないようにします。
 */
let wordle = ((window, document, wordList) => {
  'use strict';

  // 1. 必要な変数、オブジェクトリテラルの定義
  // ここにある変数を使ってもいいし、使わなくてもいいです。
  const config = {
    length: 5,
    maxTryCount: 10,
    targetWord: '',
  };
  let isFinished, isStarted, timeSec, timeStr, tryCount;
  let remainingTryCount = config.maxTryCount;

  // 2. 回答入力欄のDOMを取得
  const wordInput = document.getElementById('answer');

  // 3. NumberオブジェクトにzeroFillメソッドを追加
  /**
   * Add zero padding to number
   *
   * @param {Number} length
   * @return string
   */
  Number.prototype.zeroFill = function (length) {
    // TODO: TASK1 ここに処理を追加してください
  };

  // 4. getRandomInt関数の定義
  /**
   * Generate random integer
   *
   * @param {Number} min
   * @param {Number} max
   * @returns Number
   */
  const getRandomInt = (min, max) => {
    // TODO: TASK2 ここに処理を追加してください
  };

  // 5. 変数の初期化処理
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

  // 6. タイマーの更新処理
  /**
   * Update timer
   */
  const updateTimer = () => {
    if (isStarted) {
      // TODO: TASK3 ここに処理を追加してください
      document.getElementById('clear-time').innerText = timeStr;
      setTimeout(updateTimer, 1000);
    }
  };

  // 7. 全ての文字が正解かどうかを判定する処理
  /**
   * Check if all characters are correct
   *
   * @param {object} result
   * @return {boolean}
   */
  const isAllCorrect = (result) => {
    // TODO: TASK4 ここに処理を追加してください
  }

  // 8. 結果をHTML文字列に変換する処理
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

  // 9. 残りの試行回数を更新する処理
  /**
   * Update try count view
   */
  const updateTryCount = () => {
    document.getElementById('try-count').innerText = `${remainingTryCount}`;
  };

  // 10. ゲームオーバーかどうかをチェックする処理
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

  // 11. 単語の入力をチェックする処理
  /**
   * Check input word
   *
   * @param {string} word
   */
  const validateWord = (word) => {
    // TODO: TASK5 ここに処理を追加してください
    // 文字の長さを検査すること
    // 文字がアルファベットのみであることを検査すること
    // エラーがあればErrorをスローすること
  }

  // 12. 結果を集計する処理
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

      // TODO: TASK6 ここに処理を追加してください
      // 文字が正しいかどうかを判定すること
      // 位置が正しいかどうかを判定すること
      // 結果をresultに追加すること
    }
    return result;
  };

  // 13. 単語を判定する処理
  /**
   * Judge word
   *
   * @param {string} word
   */
  const judgeWord = (word) => {
    // 入力文字は大文字に変換します
    word = word.toUpperCase();

    // ゲームオーバーかどうかをチェックします
    // ゲームオーバーの場合は何もしません
    // ゲームオーバーでない場合は、単語を検証します
    // エラーは補足してアラートを表示します
    try {
      // TODO: TASK7 ここに処理を追加してください
    } catch (e) {
      console.error(e);
      alert(e.message);
      return;
    }

    // TODO: TASK8 ここに処理を追加してください
    // 結果を集計すること
    // 結果をHTML文字列に変換し、結果を表示すること
    // ゲームオーバーかどうかをチェックすること

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

  // 14. メインルーチン
  /**
   * Main routine
   */
  const main = () => {
    // TODO: TASK9 ここに処理を追加してください
    // 正解単語を初期化すること
    // 変数初期化処理を実行すること
    // 入力フォームの初期化処理を実行すること（最高・最低文字数の設定）
    // ボタンにクリックイベントを追加して、文字判定処理を実行すること
    // 入力フォームにEnterキーのイベントを追加して、文字判定処理を実行すること
    // 入力フォームに変更イベントを追加して、ゲーム開始処理を実行すること

    // Initialize try count
    updateTryCount();
  };

  //main();
  return {
    config,
    timeSec,
    timeStr,
    tryCount,
    remainingTryCount,
    getRandomInt,
    isAllCorrect,
    validateWord,
    gatherMatchResult,
    judgeWord,
  };

})(window, document, wordList);


function assert(actual, expected) {
  //if (expected instanceof Object) {
  //}

  // expectedが関数の場合は、その関数を実行して結果を比較する
  if (expected instanceof Function) {
    if (expected(actual)) {
      console.assert(`OK ${expected} === ${actual}`);
    } else {
      console.error(`Expected ${expected}, but got ${actual}`);
    }
    return;
  }

  // 期待値と実際の値を比較する
  if (actual !== expected) {
    console.error(`Expected ${expected}, but got ${actual}`);
  } else {
    console.assert(`OK ${expected} === ${actual}`);
  }
  return;
}

// TASK1
assert((5).zeroFill(2), '05');
assert((5).zeroFill(3), '005');
assert((5).zeroFill(1), '5');
assert((5).zeroFill(0), '5');
assert((10).zeroFill(2), '10');
assert((10).zeroFill(3), '010');
assert((10).zeroFill(1), '0');
assert((10).zeroFill(0), '10');

// TASK2
//assert(wordle.getRandomInt(0, 0), 0);
//assert(wordle.getRandomInt(0, 1), 0);
//assert(wordle.getRandomInt(0, 2), 0);
//assert(wordle.getRandomInt(0, 3), 0);
//assert(wordle.getRandomInt(0, 4), 0);

// TASK3
reset();
console.log('wordle.timeStr');
console.log(wordle.timeStr);
assert(wordle.timeStr, '00:00:00');
wordle.updateTimer(false);
assert(wordle.timeStr, '00:00:01');
wordle.timeSec = 61;
wordle.updateTimer(false);
assert(wordle.timeStr, '00:01:02');

// TASK4
assert(wordle.isAllCorrect([{isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}], true));
assert(wordle.isAllCorrect([{isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: true}, {isCorrect: false}], false));
assert(wordle.isAllCorrect([{isCorrect: true}, {isCorrect: true}, {isCorrect: false}, {isCorrect: true}, {isCorrect: false}], false));
assert(wordle.isAllCorrect([{isCorrect: false}, {isCorrect: false}, {isCorrect: false}, {isCorrect: false}, {isCorrect: false}], false));

// TASK5
assert(wordle.validateWord('ABCDE'), undefined);

// TASK6
assert(wordle.gatherMatchResult('ABCDE'), [
  {char: 'A', isCorrect: true, isIncluded: false},
  {char: 'B', isCorrect: true, isIncluded: false},
  {char: 'C', isCorrect: true, isIncluded: false},
  {char: 'D', isCorrect: true, isIncluded: false},
  {char: 'E', isCorrect: true, isIncluded: false}
]);
assert(wordle.gatherMatchResult('BCDEF'), [
  {char: 'B', isCorrect: false, isIncluded: true},
  {char: 'C', isCorrect: false, isIncluded: true},
  {char: 'D', isCorrect: false, isIncluded: true},
  {char: 'E', isCorrect: false, isIncluded: true},
  {char: 'F', isCorrect: false, isIncluded: true}
]);

// TASK7
wordle.judgeWord('ABCDE');
assert(wordle.remainingTryCount, 9);
wordle.judgeWord('ABCDE');
assert(wordle.remainingTryCount, 8);
wordle.judgeWord('ABCDE');
assert(wordle.remainingTryCount, 7);

// TASK8
wordle.judgeWord('ABCDE');
