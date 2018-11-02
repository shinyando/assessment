(function () {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    function removeAllChildren(element) {
        while (element.firstChild) { //子供の要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = function () {
        // assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { //名前がからの場合は処理を終了する
            return;
        }
        console.log(userName);

        //診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ') +
            +'&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    }

    const answers = [
        '{userName}のいいところは声です。',
        '{userName}のいいところはまなざしです。',
        '{userName}のいいところは情熱です。',
        '{userName}のいいところは厳しさです。',
        '{userName}のいいところは知識です。',
        '{userName}のいいところは用心深さです。',
        '{userName}のいいところは好奇心です。'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * 
     * @param {String} userName ユーザーの名前
     * @return {string} 診断結果 
     */
    function assessment(userName) {
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        //文字のコード番号の合計を回答の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/{userName}/g, userName);
        return result;
    }
    console.assert(assessment('太郎') === '太郎のいいところは知識です。');
    console.assert(assessment('サブ郎') === '太郎のいいところは声です。'
        , '入力を変換する処理が誤っております');

    console.assert(assessment('太郎') === assessment('太郎'));

})();
