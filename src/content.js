const scriptCode = '(' + function() {
    const STYLE_CODE = `
.item-chat-message-v2 .avatar {
    border-radius: 100px;
    box-shadow: black 0px 0px 4px;
}
.profile .user-avatar {
    background: #fff0;
    left: 30px;
    top: 50px;
    border-radius: 100px;
}
.profile-avatar-popup {
    left: 30px;
    top: 50px;
}
.photo-rounded {
    border-radius: 100px;
}
.profile .text-status-bubble:after {
    background: none;
}
.room-view-v3.white-theme .item-chat-message-v2 .bubble {
    box-shadow: black 0px 0px 4px;
}
.item-room-preview .item-user .avatar {
    border-radius: 100px;
    box-shadow: black 0px 0px 4px;
}
.item-room-preview .item-user {
    border-radius: 100px;
}
.room-view-v3.white-theme .item-chat-message-v2 .full-name-container .full-name {
    font-weight: 800;
}
.black-zone {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    left: 0px;
    top: 0px;
    border-radius: 5px;
    z-index: 2;
}
.dialog-invite-users-into-self-room .avatar {
    border-radius: 100px;
}
.room-view-v3 .left-bottom-btns .btn {
    position: relative;
    vertical-align: middle;
    margin: 0 2px;
    font-size: 11px;
    min-width: 0;
    padding: 0 2px;
    box-shadow: 0 0px #fff0;
}
.op {
    background-color: #fff0;
}
.btn-icon {
    vertical-align: middle;
    opacity: 90%;
}
.room-view-v3 .rooms-list {
    width: 22px;
}
.item-chat-message-v2 .message-likes {
    align-self: center;
}
`;
    s = 1;
    g = {
        MULTI: s++,
        ROUND_START: s++,
        ROUND_PAUSED: s++,
        ROUND_WAITING: s++,
        CREATE_USER: s++,
        REMOVE_USER: s++,
        UPDATE_USER_ON_ENTER_ROOM: s++,
        SEND_GIFT: s++,
        REMOVE_GIFT: s++,
        USER_EXP_TODAY: s++,
        USER_GIFT_COUNT_TOTAL: s++,
        USER_GIFT_COUNT_SENT: s++,
        USER_GIFT_COUNT_RECEIVED: s++,
        USER_LOTTERY_WINS: s++,
        USER_RADIO_LIKES_COUNT: s++,
        USER_AWAY: s++,
        VIEWER_ANSWER: s++,
        ROUND_ANSWER: s++,
        VIEWER_PRIVATE_MESSAGE_COUNTER_CHANGES: s++,
        VIEWER_PRIVATE_MESSAGES_CHANGE: s++,
        USER_ANSWER_STATE: s++,
        USER_WASTEFUL: s++,
        USER_POPULAR: s++,
        USER_DJ: s++,
        USER_FORTUNATE: s++,
        USER_LOTTERY_BET: s++,
        NEW_CHAT_MESSAGES: s++,
        RADIO: s++,
        RADIO_VOTES: s++,
        RADIO_COOL_LIKE: s++,
        RADIO_LIST: s++,
        CROWN_VOTE: s++,
        ROOM_INVITE: s++,
        EXIT_REASON: s++,
        RESQUE: s++,
        INTERRUPT_CURRENT_TRACK: s++,
        SENT_GIFTS_PER_ROOM: s++,
        RECEIVED_GIFTS_PER_ROOM: s++,
        PLACE_PURCHASE_IN_QUEUE: s++,
        PLACE_CONFIRM_TO_QUEUE: s++,
        QUEUE_IS_CHANGED: s++,
        QUEUE_IS_REORDER: s++,
        USER_HAS_BDATE_TODAY: s++,
        CHOOSE_COUPLE_ROUND: s++,
        USERS_COOL_LIKES: s++,
        USER_CHANGE_AVATAR: s++,
        LOADING_ROUND: s++,
        CHANGE_LIKES_OF_CHAT_MESSAGE: s++,
        MERGE_CHAT_MESSAGE: s++,
        USER_NAME_UPDATE: s++,
        REMOVE_CHAT_MESSAGES: s++,
        CHANGE_SUB_STATE_OF_ROUND_CHOOSE_EACH_OTHER: s++
    };

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    let od = setInterval(function() {
        ph = app.info.photo_200;
        if (ph) {
            clearInterval(od);
            const name = util.lStorage.find("customName");
            const otherName = util.lStorage.find("otherCustomName");
            if (name) {
                app.info.first_name = name;
                app.info.last_name = name;
            }
            if (otherName) {
                $.each(["gen", "dat", "acc", "ins", "abl"], function(_, t) {
                    app.info["first_name_" + t] = otherName;
                    app.info["last_name_" + t] = otherName;
                });
            }
        }
    }, 500);
    const setLiloTemplate = (k, f) => {
        const i = setInterval(() => {
            if (lilo.templates[k] !== undefined) {
                lilo.templates[k] = f;
                clearInterval(i);
            }
        }, 100)
    }
    const setLiloViewFactories = (k, f) => {
        const i = setInterval(() => {
            if (lilo.viewFactories[k] !== undefined) {
                lilo.viewFactories[k] = f;
                clearInterval(i);
            }
        }, 100);
    }
    setLiloTemplate("room-view-v3", '<div class="room-view-v3"><div class="main" el="main-area"><div class="room-bg pe-none"></div><div class="local-top-timer pe-none">Призы за титул через: <span bind="leftTimeForNextRewardOfLocalTop" handler="audioTimer"></span></div><div class="white-zone"></div><div el="arrow-canvas"></div><div el="canvasLayer" class="canvas-area no-select"></div><div class="wait-next-round-loader no-select"><span el="loading-text"></span><div class="wrapper"><div class="progress"></div></div></div><div class="wait-users-loader no-select"><div bind="viewModel.showSelfRoomPreloader" handler="setVisible" inverse="true">Игра на совместимость<br><small>Нужно минимум 3 парня и 3 девушки. Ожидаем игроков...</small><br><div class="btn switch-room1">Перейти в другую комнату</div></div><div bind="viewModel.showSelfRoomPreloader" handler="setVisible">B Вашу комнату игроки могут попасть только по приглашению<br><div class="btn invite-friend-into-self-room invite-friends2"></div><br>или по ссылке: <span class="invite-friends-link" bind="viewModel.inviteRoomLink"></span></div></div><div class="question-wrap"><div class="question-text no-select" bind="roundQuestion.text" handler="escape-html"></div><div class="answer-saved no-select">Ответ сохранен. Ожидаем других игроков</div></div><div class="question-creator"><div bind="viewModel.hasUidAndFirstName" handler="setVisible">Автор: <span bind="roundQuestion.fullName" handler="escape-html"></span> <i>Создать вопрос</i></div></div><div el="answersList" class="answers no-select" bind="roundQuestion.answers" handler="list" renderer="item-answer"></div><div class="first-user-votes no-select" bind="firstUidVotes"></div><div class="second-user-votes no-select" bind="secondUidVotes"></div><div class="votes-or no-select">или</div><div class="room-location-info" el="location-info"></div><div class="top-users no-select" bind="topUsers" handler="list" renderer="item-room-user-v3"></div><div class="bottom-users no-select" bind="bottomUsers" handler="list" renderer="item-room-user-v3"></div><div class="couple-area" el="couple-actions"><div class="btns"><span action-id="1" class="red-btn">Поцеловать</span> <span action-id="3" class="blue-btn">Подмигнуть</span> <span action-id="4" class="gray-btn">Ничего</span><span action-id="5" class="gray-btn">Проспать</span></div></div><div class="couple-area pe-none" el="couple-results"><div class="top-result"></div><div class="bottom-result"></div><div class="left-result"></div><div class="right-result"></div></div><div class="answer-saving-overlay no-select"><span>Сохранение ответа</span></div><div class="timer no-select" bind="viewModel.roundLeftTime" handler="secondsTimeV2"></div><div class="chat-area" el="chat"><div class="room-bg pe-none mobi"></div><div el="audio-player-el"><div class="player-not-enabled"><span>Где проигрыватель?</span></div></div><div class="chat-form no-select cf"><form action=""><div class="reply" el="reply"></div><span class="hint phrases hint-btn"></span> <span class="hint chat-timer"></span> <span class="hint left-symbols"></span><div class="submit-btn">Отправить</div><div class="input-wrap"><div class="textarea" el="chat-input"></div><div class="popup"></div><div class="selected-user"></div></div><div class="phrases-list"></div></form><div class="add-message-overlay"></div><div el="chat-lock"></div></div><div el="chat-messages-scroll-wrap" class="chat-messages-scroll-wrap"><div class="chat-messages chat-messages-1"></div><div class="chat-messages chat-messages-2"></div></div><div class="chat-bottom-hints"><div class="room-owner-info"></div><div class="left-coins-info"></div></div><div class="toggle-chat-mode-info">Нажмите сюда или 2 раза Ctrl, чтобы перекл. чат</div><div class="chat-pending-overlay" bind="pending" handler="setVisible"></div></div><div class="room-search-overlay no-select" handler="setVisible" bind="roomId"><span>Поиск комнаты</span></div><div el="room-preview" class="room-preview" bind="pending" handler="setVisible"></div><div class="tutorial-hint" id="tutorial-hint"></div><div id="tutorial-complete-layer"><div id="complete-tutorial-btn"></div></div><div el="couple-match-view"></div><div el="fx-wrap"></div><div el="p2p"></div></div><div el="exp-line"><div class="left-bottom-btns no-select"><div class="btn op online-friends"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA0UlEQVRIie2TQQ6CMBBFH0Y4gEu9gofiDB7C4CGIC/bGmHgCvAJHAF27KRuDCwdCSmmBncpLJmnnz59pCoWZvyUADkAB5EAkuaG6kwiotIhG6E4KQ4P7CL1h0TOgMuReI/TOgA1wbZ0iMdQmPWtbruEipzrLPuBzpzn9H9mmd3hI87Wt6CtYASFwAjLgKZFJLpSamp1Db/CBPaDo/n56KKn1xXt06ADEAxrrEYt369ABKCcMUOJd2nRPikwPZwguv1c/tNuE5mlrbfKnhtzML/IGkgdytsiYyPMAAAAASUVORK5CYII=" class="btn-icon"></div><div class="btn op self-room-control"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABT0lEQVR4nM2UPUvDUBSGH0VEKoL4AwSXZnLqIjo46OQouKqDxh+g4OwfcBV3cXF0ElE6XHDJUBwdhOJQHKRD3VqMBN7I5Zrme+gLB5Jzz32e5BICE5QpYFMVXdeWBcAHXoFQ9QacA0tVwKvAFTAQtAt8qbrqDTQTzebKLLAHPAI/ghj1ZoBANQ1sA/fWXKA3nUsCzwMXQE/DfeASaDpzscBOU7N97e2J1bCHDrXYAY7cxQxBnIb2dsQ6sBd9NVtWbxE4Be5SBNEH4KYllp8m2AG+rbMdJ3gBboG1ooL4PswQBNbcfhnBJ3CSU+AXEewCZ/q64njAh8qrKrDjATfAyIKN1HuvIlgBroGhBUmr3IKkJw5z1IP2pgraJcChc3TtJMFxBWg4piLmX5aBpxrhz2L+y4b+kGXBBthKAlcVmbzgoiJTFpwlMnWB3ayrJie/1Jvm4Lvg0owAAAAASUVORK5CYII=" class="btn-icon"></div><div class="btn op invite-friend-into-self-room"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAABWElEQVQ4jdWUP08CQRDFfxALGjVYakQssLPRwsZSrCw02lDS+QGs/CAolZUdUikfhBgTRA2GRimMWIGJnsW9i8veP/Gw8CWb2X0z+25ud2bhvyE1RlxB8zbgTOLjm8CDxBzgXlwiLAAvhqg3XoFc1MZ0jHAZyAbws8BhEuHlCN9iEuHrCN9NzN5IzAAd/GfcAaaTCAMsAVfAh8aluIkho/GnyANVoAu8y56KHwsZYErzbeAN/7k74otxQrvAOXAHtHArKG+JfspnivcJaJ40cIS/247lr1p8TXzN4k9s4bOQX9yRv2tkegGUxJe09uIfTdGVEFEHWFPMUOuWnZFwK//A7Lz5kGCAOdln2QJQtzKu8/20PsW1tIcN2YZsCtgD9rU+0NpDw3zos8B6iHAPaOJWRZPRdm4bmYJbNas/THgERdySCrqLPrD1G1EPOaCCe/tD2QpG/X4BrWxu45eSC+gAAAAASUVORK5CYII=" class="btn-icon"></div><div class="btn op switch-room"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABEElEQVRIie3UrUoEYRTG8R+iUTAYttlsVsELscmwIGIWgyBY/LgDwXVBb8MgaBGD2Cwmw8KKzWJR3NUw78Drq6uzw45B/MPAmeGc5wzni39+iWlkdSZYRQ/7dSY5DklagxzWcBM952h+IziObVxGMU/oY6dwGosCYhtmcYTrIBbTQAebwU5JtQayhBecJX/ewSPmou9teYkOy4oXbITArfB+EpIuRD4rwac9rHjBKZ7lU9KT1z6mIZ+kykygizdcDBNYuhl181OJprBcVbxMkzMVm5wZ4Ziu+7jJ9yHgyteL1sUr7nze5L3CMW5yPxG5lZ+K+SAU84AZ7AY7JdUaCcWxO6hDvKnmcz2JxbrE/zjv5LNMiFUvzmwAAAAASUVORK5CYII=" class="btn-icon"></div><div class="btn op rooms-list"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABmJLR0QA/wD/AP+gvaeTAAABHklEQVQ4jcXUzSuEURTH8c8zTTSlKTUWWJkls5GX5azImpWtjZeFhb2tnfInjMLC0j9gQQmxFUslypQkRcnL4rkyDZt5nge/up3bPadvp3t/9/BdS6ij+4dcYg3gGdfoSAPK4xL7mEEN7ZjHY6jpxFgS+C7ecRLiRlN+KJy3tCKUcIQyblDBXQO4hKkkHUM/DjGRFPCvKostl88Smsep+AH60sKmMRL2ywFaSwuN8IA3zIqtVhc74z7UVLDTKjiHBRSxjTbMNUBTa0V8BetZAT8VYRyFrMF/ohy6fgO8hhcZ+Ljo65dV8Ypz8fhMrAi3OMMkjsWdVnEQanqxmAS+JbbaVYirTfnE87iAPQzjAoN4agAXMZqkY+jBZoBmog81GUu/p7kjfQAAAABJRU5ErkJggg==" class="btn-icon"></div><div class="btn op toggle-bg"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAU0lEQVRIiWNgGAUkgqMMDAz/oRgd/EfDuOQPIwsyYlFEjBzRepmwuISqAN0VyIAUF+M0i+Y+GPoWDP1UNPQtGM0HA2/B8MsHR6hg5mHCSkYBEgAAuowYJZey4YYAAAAASUVORK5CYII=" class="btn-icon"></div><div class="btn op toggle-fullscreen"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhElEQVR4nGNgGAWkAGlpaX0pKaldUlJSZ5BwLS71UlJSdWhqd0lLS+vhtABq+Fc0TTV41NeiqQXp3YnPArBCkrxNiv5hYUEtvjAnBCjVPwpGARFAUlKyXFJSsoxm+qWGQ04+Q2sLdmEprmtJqA/wF9egygKkgIL6YKeMjIwuSd5mGPEAAOWoULDf6FXMAAAAAElFTkSuQmCC" class="btn-icon"></div><div el="toggleSound" class="btn op toggle-sound no-select"></div></div></div><div el="top-list-area"></div></div>');
    setLiloTemplate("popular-widget", '<div class="popular-widget"><div class="back-line"></div><div class="progress"></div><div class="round left"></div><div class="round right"></div><span class="hint" el="hint"></span></div>');
    setLiloTemplate("item-chat-message-v2", '<div class="item-chat-message-v2"><div class="flex-container"><div bind="fromAvatar" handler="bImg" class="avatar push-to-textarea"><div bind="fromExp" handler="exp-level-v2" class="exp-level"></div></div><div class="bubble push-to-textarea"><div bind="fromExp" handler="color-by-level" class="full-name-container"><div class="name-wrapper"><div class="name-gradient-bg"></div><div bind="isSenderVerified" handler="setVisibleInlineBlock" class="verification-icon"></div><div bind="firstName" handler="escape-html" class="full-name"></div></div></div><div class="reply-container"></div><div el="message-container" class="message-container"><span class="address"><span bind="toFirstName" handler="escape-html"></span><span>,&nbsp;</span></span><div bind="message" handler="text-with-emoji-of-model-v2" uid-property="from" text-property="message" class="message-body"></div></div><div class="bubble-triangle"></div></div><div class="message-like"><div bind="likesCount" handler="addClass" true="has-likes" class="message-like-wrap"><div bind="hasLike" handler="addClass" true="has-like" class="message-like-heart"></div><div bind="likesCount" handler="setVisible" class="message-like-counter"><span bind="likesCount"></span></div></div></div></div>');
    setLiloTemplate("dialog-shooter-range", '<div class="dialog-shooter-range"><div class="title" bind="title"></div><div class="timer kisses-round special" el="timer"></div><div class="range" bind="avatar" handler="bImg"><div class="sight"></div></div><div class="kisses-round special"><div class="btn blue default submit" bind="count" handler="setVisible" style="">Отправить</div><div bin class="btn blue btn-back">Назад</div><div class="btn default clear" bind="count" handler="setVisible" style="">Убрать поцелуи</div><div class="hint2 hint">Вам <span bind="leftKisses" handler="pluralize" one="доступен" two="доступно" many="доступно">доступно</span> <b bind="leftKisses">8</b> <span bind="leftKisses" handler="pluralize" one="поцелуй" two="поцелуя" many="поцелуев">поцелуев</span></div><div class="hint hint1" handler="setVisible" bind="levelForAccess">Через <b bind="leftLevels">0</b> <span bind="leftLevels" handler="pluralize" one="уровень" two="уровня" many="уровней">уровней</span> вам будет <span bind="nextKisses" handler="pluralize" one="доступен" two="доступно" many="доступно">доступно</span> <b bind="nextKisses">0</b> <span bind="nextKisses" handler="pluralize" one="поцелуй" two="поцелуя" many="поцелуев">поцелуев</span></div></div><div class="normal-gift special"><div class="price"><span class="coin"></span><div class="bonus-gift special"><div class="bonus-hint"></div></div></div><span class="btn blue btn-submit">Отправить</span><br><span class="btn blue btn-back">Назад</span><br><span class="btn btn-cancel">Отмена</span></div><div class="special transform-range"><div class="error-hint">Подарок выходит за границы аватарки</div><span class="btn btn-submit">Отправить</span></div></div>');
    //setLiloTemplate("item-chat-message-v2", '<div class="item-chat-message-v2"><div class="flex-container"><div bind="fromAvatar" handler="bImg" class="avatar push-to-textarea"><div bind="fromExp" handler="exp-level-v2" class="exp-level"></div></div><div class="bubble push-to-textarea"><div bind="fromExp" handler="color-by-level" class="full-name-container"><div class="name-wrapper"><div class="name-gradient-bg"></div><div bind="isSenderVerified" handler="setVisibleInlineBlock" class="verification-icon"></div><div bind="firstName" handler="escape-html" class="full-name"></div></div></div><div class="reply-container"></div><div el="message-container" class="message-container"><span class="address"><span bind="toFirstName" handler="escape-html"></span><span>,&nbsp;</span></span><div bind="message" handler="text-with-emoji-of-model-v2" uid-property="from" text-property="message" class="message-body"></div></div><div class="bubble-triangle"></div></div><div class="message-like"><div bind="likesCount" handler="addClass" true="has-likes" class="message-like-wrap"><div bind="hasLike" handler="addClass" true="has-like" class="message-like-heart"></div><div bind="likesCount" handler="setVisible" class="message-like-counter"><span bind="likesCount"></span></div></div></div><div class="message-likes" style="align-self: center;"><div bind="likesCount" handler="addClass" true="has-likes" class="message-likes-wrap has-likes"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVUlEQVR4nO3VMQqAMBBE0T2ewVubmyTe49sIahCRFBHhv3aLgYFhI6RRgBlYgQqkkcGVQ2lumT75q+DlTXDawwswddUm3XHHcW3DHeuH8B+fuGMpHmwHAxf5nL4N4AAAAABJRU5ErkJggg=="></div></div></div></div>');
    setLiloTemplate("dialog-toggle-vklink-access", '<div class="dialog-toggle-vklink-access dialog-subscription-settings" bind="pending" handler="addClass" true="pending"><div class="option pl0"><label class="control label-block"><input class="left-side float-left" type="checkbox" el="checkbox"><div class="option-title">Скрыть ссылку на мой профиль ВКонтакте</div><div class="option-descr">*Доступно только для верифицированных пользователей</div></label></div><div class="search option pl0" el="search"><input type="text" class="text-input name" el="search_input" placeholder="Имя..."><div class="option-descr">*Изменится после перезагрузки</div></div><div class="search option pl0" el="search"><input type="text" class="text-input other_name" el="search_input" placeholder="Склоняемое имя..."></div><div class="bottom-area"><div class="btn save control">Сохранить</div><div class="btn close-dialog control">Отмена</div></div><div class="loader">Сохранение...</div></div>');
    lilo.templates["dialog-likes-message-users"] = '<div class="dialog-likes-message-users" bind="pending" handler="addClass" true="pending"><div class="scroll-wrap" el="scroll"><div class="no-results" el="no-results"></div><div class="result-list"></div></div><div class="loader-block" bind="pending" handler="setVisible"></div></div>';

    app.controllers.dialog.LikesMessage = function(e) {
        o = lilo.createView("dialog-likes-message-users");
        this.open = dialogController.open(o, {});
        this.dialogView = o;
    }
    app.controllers.dialog.GiftShootingRange = function(U) {
        var L, F = 200, V = 200, B = 50, G = 50, H = lilo.createView("dialog-shooter-range");
        this.getDialogWindow = function() {
            return e
        }
        ;
        var W = {};
        (U.giftDescription.type === ROOM_GIFT_TYPE.WITH_TARGET ? function() {
            (L = H.$(".range")).css("cursor", "none"),
            util.watch(function() {
                return "#debug" === location.hash
            });
            var n, o = H.$(".sight"), a = 0, s = 0, r = !1, i = !1, l = $.noop, e = 0, t = 0, d = function(e, t) {
                e < 0 || t < 0 || F < e || V < t ? i = r = !1 : (r = !0,
                o.css({
                    left: e - B / 2 + "px",
                    top: t - G / 2 + "px"
                }),
                a = e,
                s = t,
                l())
            }, c = function(e) {
                U.onComplete(e),
                dialogController.close(H)
            };
            setTimeout(function() {
                n = L.offset(),
                !IS_DESKTOP ? (d(100, 100),
                L.on("touchstart", function(e) {
                    if (r) {
                        var t = e.originalEvent.touches;
                        if (t.length) {
                            var i = t[0].pageX
                              , t = t[0].pageY;
                            return n = L.offset(),
                            d(i - n.left, t - n.top),
                            c({
                                x: parseInt(a / 2, 10),
                                y: parseInt(s / 2, 10)
                            }),
                            e.preventDefault(),
                            e.stopPropagation(),
                            !1
                        }
                    }
                })) : (L.on("mousemove", function(e) {
                    n = L.offset(),
                    d(e.pageX - n.left, e.pageY - n.top)
                }),
                d(100, 100),
                o.show(),
                L.on("mousedown", function() {
                    r && (c({
                        x: parseInt(a / 2, 10),
                        y: parseInt(s / 2, 10)
                    }),
                    i = !0,
                    e = a,
                    t = s)
                }),
                L.on("mouseup", function() {
                    i = !1
                }))
            }, 100);
            var u = U.giftDescription.id;
            L.off("click");
            var p, f, m = Math.abs, l = function() {
                i && r && (23 < m(a - e) || 23 < m(s - t)) && (c({
                    x: parseInt(a / 2, 10),
                    y: parseInt(s / 2, 10)
                }),
                e = a,
                t = s)
            }, v = 1e3, h = [], objectsGift = [], g = H.$(".coin"), b = function() {
                g[0].innerHTML = (U.giftDescription.price || U.giftDescription.rubyPrice) * h.length
            };
            U.giftDescription.rubyPrice && H.el.addClass("ruby-price"),
            U.giftDescription && U.giftDescription.recipientBalanceBonus && (p = H.$(".bonus-hint"),
            f = b,
            H.el.addClass("bonus-gift"),
            b = function() {
                f();
                var e = h.length * U.giftDescription.recipientBalanceBonus;
                p[0].innerHTML = "Бонус получателю: <b>+" + e + "</b>"
            }
            ),
            b();
            var C, _, w, E, y, D, T, S, A, I, M, O = H.$(".normal-gift  .btn-submit").click(function() {
                0 < h.length && U.onComplete(h, H)
            }).css({
                visibility: "hidden"
            }), x = (H.$(".btn-cancel").click(function() {
                dialogController.close(H)
            }),
            H.$(".normal-gift .hint"),
            T = {
                title: U.headerText,
                count: 0,
                price: 0,
                nextKisses: y,
                leftKisses: D,
                leftLevels: E,
                levelForAccess: w,
                freeKisses: D,
                avatar: U.photo200
            },
            U.giftDescription), back = H.$(".btn-back").click(()=>{
                0 < h.length && h.pop(), objectsGift.pop(), console.info(L[0].childNodes), L[0].removeChild(L[0].childNodes[L[0].childNodes.length-1]), b(), L.css("cursor", ""), T.setAttr({
                    count: h.length
                })
            }), R = U.giftDescription.imgSight || U.giftDescription.img, k = 2 * (x.w || 24), P = 2 * (x.h || 24), N = function() {
                return R
            };
            x.isMulticolor && x.landingImages && x.landingImages.length && (R = x.landingImages[0],
            C = 0,
            N = function() {
                return C++,
                x.landingImages[C % x.landingImages.length]
            }
            ),
            c = function(e) {
                var t = document.createElement("div")
                  , i = t.style;
                i.position = "absolute",
                i.width = k + "px",
                i.height = P + "px",
                i.left = 2 * e.x - k / 2 + "px",
                i.top = 2 * e.y - P / 2 + "px",
                i.background = "url({0}) no-repeat center".format(N()),
                i.backgroundSize = "100% 100%",
                L[0].appendChild(t),
                objectsGift.push(t),
                h.push({
                    x: e.x,
                    y: e.y,
                    w: null,
                    h: null,
                    a: null
                }),
                b(),
                O[0].style.visibility = ""
            },
            u === app.info.roomGiftKissId ? (v = 10,
            H.el.addClass("kisses-round"),
            R = CDN_PREFIX + "game-gift-v2/1023_80_1.png",
            P = k = 70,
            _ = expController.getCurrentLevel(),
            y = E = w = 0,
            D = 1,
            90 <= _ ? D = 10 : (E = (w = 10 * (D = Math.floor(_ / 10) + 1)) - _,
            y = D + 1),
            $.extend(W, {
                isModal: !0
            }),
            H.setModel(T),
            T.onChange("count", function() {
                T.setAttr({
                    leftKisses: D - T.count
                })
            }),
            H.bind("submit", S = function() {
                0 === h.length && util.repeat(D, function() {
                    A({
                        x: util.random(20, 80),
                        y: util.random(20, 80)
                    })
                }),
                c = d = $.noop,
                U.onComplete(h, H, {
                    giftId: u
                })
            }
            ),
            H.bind("clear", function() {
                h.length = 0,
                T.setAttr({
                    count: 0
                }),
                L.empty().append(o),
                L.css("cursor", "")
            }),
            A = c,
            c = function(e) {
                var t = T.count + 1;
                D < t || (A(e),
                T.setAttr({
                    count: h.length
                }))
            }
            ,
            I = U.leftSeconds,
            M = function() {
                H.isVisible && (H.els.timer.html(I),
                I <= 0 ? S() : (I--,
                setTimeout(M, 1e3)))
            }
            ,
            setTimeout(M, 0)) : (
            H.setModel(T),
            H.el.addClass("normal-gift"))
        }
        : function() {
            var d, t = 40, c = 50, u = 260, p = 260;
            H.$(".sight").remove(),
            setTimeout(function() {
                var r = document.createElement("canvas");
                H.el.addClass("transform-range"),
                (L = H.$(".range")).append(r),
                H.setModel({
                    title: U.headerText,
                    avatar: U.photo200
                }),
                r.width = 340,
                r.height = 385;
                var l = new fabric.Canvas(r);
                fabric.Object.prototype.transparentCorners = !1,
                fabric.Image.fromURL(U.giftDescription.img, function(n) {
                    var o, a, i = parseInt((u - 100) / 2, 10) + t + 50, s = parseInt((p - 100) / 2, 10) + c + 50;
                    n.width = 100,
                    n.height = 100,
                    n.left = i,
                    n.top = s,
                    n.originX = "center",
                    n.originY = "center",
                    n.cornerColor = n.borderColor = "rgba(56, 121, 217, 1)",
                    n.originY = "center",
                    isMobi && n.setControlsVisibility({
                        mtr: !1,
                        bl: !1,
                        br: !1,
                        tl: !1,
                        tr: !1,
                        mt: !1,
                        mb: !1,
                        ml: !1,
                        mr: !1
                    }),
                    l.add(n),
                    l.setActiveObject(n),
                    d = function() {
                        n.setCoords();
                        var e = n.getBoundingRect()
                          , e = e.left < t || e.top < c || e.left + e.width > u + t || e.top + e.height > p + c;
                        return f.css("visibility", e ? "visible" : "hidden"),
                        m[e ? "addClass" : "removeClass"]("disabled"),
                        e
                    }
                    ,
                    n.observe("rotating", d),
                    n.observe("scaling", d),
                    n.observe("moving", d),
                    window.oImg = n,
                    window.fabricCanvas = l,
                    isMobi ? (o = function(e) {
                        var t = n.getBoundingRect();
                        (t.left > r.width || t.left + t.width < 0 || t.top > r.height || t.top + t.height < 0) && (n.left = i,
                        n.top = s),
                        d(),
                        l.renderAll()
                    }
                    ,
                    a = Math.round(.1 * n.width),
                    H.el.on("touchstart", ".img-inc", function(e) {
                        var t = n.width + a
                          , i = n.height + a;
                        return u < t || p < i || (n.width = t,
                        n.height = i),
                        o()
                    }),
                    H.el.on("touchstart", ".img-dec", function(e) {
                        var t = n.width - a
                          , i = n.height - a;
                        return t < a || i < a || (n.width = t,
                        n.height = i),
                        o()
                    }),
                    H.el.on("touchstart", ".img-rotate-left", function(e) {
                        return n.angle = (n.angle - 10) % 360,
                        o()
                    }),
                    H.el.on("touchstart", ".img-rotate-right", function(e) {
                        return n.angle = (n.angle + 10) % 360,
                        o()
                    }),
                    H.el.on("touchstart", ".img-left", function(e) {
                        return n.left -= 10,
                        o()
                    }),
                    H.el.on("touchstart", ".img-right", function(e) {
                        return n.left += 10,
                        o()
                    }),
                    H.el.on("touchstart", ".img-top", function(e) {
                        return n.top -= 10,
                        o()
                    }),
                    H.el.on("touchstart", ".img-bottom", function(e) {
                        return n.top += 10,
                        o()
                    })) : l.on("mouse:up", function() {
                        n.setCoords();
                        var e = n.getBoundingRect();
                        (e.left > r.width || e.left + e.width < 0 || e.top > r.height || e.top + e.height < 0) && (n.left = i,
                        n.top = s,
                        l.renderAll(),
                        d())
                    }),
                    d()
                })
            }, 150);
            var f = H.$(".error-hint")
              , m = H.$(".transform-range .btn-submit").click(function() {
                var e;
                d() || (e = {
                    x: parseInt((oImg.left - oImg.getWidth() / 2 - t - 30) / 2, 10),
                    y: parseInt((oImg.top - oImg.getHeight() / 2 - c - 30) / 2, 10),
                    width: parseInt(oImg.getWidth() / 2, 10),
                    height: parseInt(oImg.getHeight() / 2, 10),
                    angle: util.degreeToRadians(oImg.angle)
                },
                U.onComplete({
                    rect: e
                }),
                dialogController.close(H))
            })
        }
        )();
        var e = dialogController.open(H, W);
        return {
            dialogWindow: e,
            controller: this,
            dialogView: H
        }
    }
    setLiloViewFactories("dialog-toggle-vklink-access", function(e, t) {
        var i = lilo.baseViewFactory(e, t),
            nameValue = i.$(".name"),
            otherNameValue = i.$(".other_name"),
            avatarId = i.$(".avatar_id"),
            backgroundId = i.$(".background_id");
        nameValue.val(util.lStorage.find("customName"));
        otherNameValue.val(util.lStorage.find("otherCustomName"));
        avatarId.val(util.lStorage.find("avatarId"));
        backgroundId.val(util.lStorage.find("backgroundId"));
        return i.el.on("click", ".save", function() {
                util.lStorage.save("customName", nameValue.val());
                util.lStorage.save("otherCustomName", otherNameValue.val());
                util.lStorage.save("avatarId", avatarId.val());
                util.lStorage.save("backgroundId", backgroundId.val());
                i.trigger("save", {
                    checked: i.els.checkbox.prop("checked")
                });
            }),
            i.createViewModel = function(e) {
                i.els.checkbox.prop("checked", e.checked),
                    e.disabled && i.$(".option-title").css("color", "#ccc"),
                    i.els.checkbox.prop("disabled", e.disabled)
            },
            i;
    });
    lilo.viewFactories["dialog-likes-message-users"] = function(e, t) {
        var r = lilo.baseViewFactory(e, t);
        return r.createViewModel = function(l) {}, r;
    };
    setLiloViewFactories("item-chat-message-v2", function(e, t) {
        var r = lilo.baseViewFactory(e, t),
            l = app.ChatMessageType;
        r.el.on("click", ".message-like-wrap", function() {
            r.trigger("toggle-like", {
                model: r.model
            })
        });
        r.el.on("click", ".message-likes-wrap", function() {
            a = new app.controllers.dialog.LikesMessage(r);
            return void a.open();
            alert(r.model);
        });
        var e = "exp_240_level",
            t = "exp_230_level",
            d = util.cache.find(e),
            c = util.cache.find(t);
        return d || (d = expController.levelToExp(240),
                util.cache.save(e, d, 864e5)),
            c || (c = expController.levelToExp(LEVEL_PURPLE),
                util.cache.save(t, c, 864e5)),
            r.createViewModel = function(e) {
                e.from === app.info.viewer_id && r.el.addClass("from-viewer"), !e.isReply && (e.to === app.info.viewer_id || e.reply && e.reply.from === app.info.viewer_id) && r.el.addClass("is-to-viewer");
                var t = e.reply;
                t && ((a = lilo.createView("item-chat-message-v2")).setModel(t),
                    r.$(".reply-container").append(a.el),
                    lilo.getSimpleBindHandler("border-by-level-v2")(a.el, t.fromExp));
                var i, n, o, a, s = e.type === l.STICKER;
                s ? (r.el.addClass("is-sticker"),
                    i = app.controllers.dialog.Stickers.Configuration.parseOrDefault(e.message, e.fromMale).toDocumentFragment(),
                    n = document.createElement("div"),
                    o = document.createElement("div"),
                    a = document.createElement("div"),
                    o.className = "bubble-triangle",
                    a.className = "sticker-wrap",
                    e.recipientFirstName && ((t = document.createElement("span")).className = "recipient-node",
                        t.innerHTML = util.escapeHtml(e.recipientFirstName, e.from, !0),
                        n.appendChild(t)),
                    a.appendChild(i),
                    n.appendChild(a),
                    r.els["message-container"].empty().addClass("sticker").append(o).append(n)) : e.type !== l.TALK && r.$(".address").remove(), !s && e.fromExp >= d && (e.fromExp >= c ? r.el.addClass("purple-message") : r.el.addClass("gold-message"))
            },
            r
    });
    setLiloViewFactories("popular-widget", function(e, t) {
        var i = lilo.baseViewFactory(e, t),
            d = i.$(".progress"),
            c = i.$(".round.left"),
            p = i.$(".round.right"),
            hint = i.$(".hint");
        return i.createViewModel = function(l) {
                function e() {
                    app.GLOBAL_COLORS_HASH[l.ratingColor],
                        l.rating;
                    var e = expController.calcMinLevelAndProgress(l.exp),
                        t = app.getTextAndBorderColorAndByLevel(e.level),
                        i = e.level,
                        n = e.progress,
                        o = i,
                        a = o + 1,
                        s = o + 1;
                    hint.html("<b>{0}</b>/{1}".format(e.remainder, e.exp))
                    var r = t.border,
                        e = t.text;
                    d.css({
                        width: n + "%",
                        background: r
                    });
                    t = "purple-level-bg";
                    c.css({
                            background: "",
                            border: "",
                            padding: "",
                            "box-sizing": ""
                        }).removeClass(t),
                        c.text(o).addClass("complete").css({
                            border: "2px solid " + r,
                            color: e,
                            background: ""
                        }),
                        i >= LEVEL_PURPLE ? (d.css({
                                background: colorPurple
                            }),
                            c.css({
                                color: "#fff",
                                background: "",
                                border: "none",
                                padding: "7px"
                            }).addClass(t)) : 240 <= i ? (d.css({
                                background: "#000"
                            }),
                            c.css({
                                border: "2px solid #000",
                                color: "#fff",
                                background: "#000"
                            })) : c.attr("level", a),
                        p.text(s)[100 <= n ? "addClass" : "removeClass"]("complete").css({
                            border: 100 <= n ? "2px solid " + r : ""
                        }),
                        function() {
                            $.each([c, p], function(e, t) {
                                t.css({
                                    height: "",
                                    width: "",
                                    lineHeight: ""
                                });
                                var i = Math.max(t.width(), t.height());
                                t.css({
                                    height: i + "px",
                                    width: i + "px",
                                    lineHeight: i + "px"
                                });
                                i = t.outerHeight();
                                t.css({
                                    top: (60 - i) / 2 + "px"
                                })
                            });
                        }()
                }
                i.render = e,
                    l.onChange("exp", e),
                    l.onChange("ratingColor", e)
            },
            i
    });

    function loadRoomSocketData(data) {
        var type = data[0];
        console.info(getKeyByValue(g, type), data);
        var titles = {1: "Вопрос", 4: "Поцелуй", 2: "Коронки", 3: "Коронки", 9: "Выбор пары", 6: "Кто нравится", 7: "Лотерея"}
        switch (type) {
            case 17: // viewer_answer
                var user_one = data[2];
                break;
            case 2:
                var roundData = data[2];
                var typeRound = roundData[0];

                VK.callMethod("setTitle", titles[typeRound] || "");
                break;
            case 8:
                console.info("send gift");
                var h = new app.controllers.RoomResponseParser;
                var giftData = h.parseGifts(data[2]);
                console.info(giftData);
                break;
            case 5:
                console.info("create user", data[2]);
                break;
        }
    }
    setInterval(async() => {
        let d = async e => new Promise(t => {
            webSocketController.sendMessage(e, {}, e => {
                t(e)
            })
        });
        let e = +new Date,
            t = app.info.viewer_id,
            i = app.info.bootData.v;
        var n = util.md5([e, t, i].join("_"));
        let o = {
            ts: e,
            sign: n
        };
        o["action"] = "ad/reward";
        var a = JSON.stringify(o);
        let s = btoa(unescape(encodeURIComponent(a))),
            r, l = "";
        s.endsWith("==") ? (r = s.substr(0, s.length - 2),
                l = "==") : r = s,
            o = {},
            o["payload"] = r.split("").reverse().join("") + l;
        n = await d(o);
        200 === n.code && (app.balanceModel.setAttr({
                balance: n.data.balance
            }),
            dialogController.fadePopup("Вам зачислено +1 монета!"));
    }, 100000);
    webSocketController.on(webSocketController.EVENTS.ROOM_CHANGE, function(e) {
        var content = e.change;
        var type = content[0];
        switch (type) {
            case 1: // multi
                content[2].forEach((d) => { loadRoomSocketData(d) });
                break;
            default:
                loadRoomSocketData(content);
                break;
        }
    });
    const mainStarter = () => {
        let onLoad = setInterval(function() {
            var roomTopList = document.querySelector("div.room-top-list-wrap");
            if (roomTopList) {
                clearInterval(onLoad);
                roomController.canAnimateKissAnswer = (e, t) => true;
                roomController.isRoundWithoutAnswersState = () => false;
                roomView.chatFromController.startTimerLock = () => null;
                roomView.$(".toggle-fullscreen").click(()=>{
                    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
                        document.body.exitFullscreen() || document.body.mozCancelFullScreen() || document.body.webkitExitFullscreen() || document.body.msExitFullscreen();
                    } else {
                        document.body.requestFullscreen();
                    }
                });
                var st = document.createElement('style');
                st.type = "text/css";
                st.textContent = STYLE_CODE;
                (document.head || document.documentElement).appendChild(st);
                document.querySelector("div.exp-booster").remove();

                // Когда загрузятся игроки
                let onUsers = setInterval(function() {
                    let users = document.querySelectorAll("div.item-room-user-v3.viewer-is-male");
                    if (users.length) {
                        clearInterval(onUsers);
                        app.info.blockedUids = [];
                        [].forEach.call(users, function(user, i) {
                            var userId = user.getAttribute("uid") || 0;
                            [].forEach.call(user.getElementsByClassName("recent-gifts-popup"), function(gift) {
                                gift.remove();
                            });
                            user.getElementsByClassName("exp-level")[0].style["box-shadow"] = "0px 0px 8px black";
                            var btns = user.getElementsByClassName("popup")[0];
                            btns.style.height = "157px";
                            var btn = document.createElement('span');
                            btn.setAttribute("class", "open-vk-btn popup-menu-item");
                            btn.addEventListener("click", () => {
                                let uid = document.querySelectorAll("div.item-room-user-v3.viewer-is-male")[i].getAttribute("uid") || 0;
                                if (uid > 10000000000) alert("Он(а) из Одноклассников")
                                else window.open("https://vk.com/id" + uid.toString(), "_blank").focus()
                            });
                            btn.textContent = "Открыть VK";
                            btns.insertBefore(btn, btns.children[1]);
                        });
                    }
                }, 1000);
            }
        }, 100);
    }

    mainStarter();
} + ')();'


var script = document.createElement('script');
script.textContent = scriptCode;
(document.head || document.documentElement).appendChild(script);
script.remove();