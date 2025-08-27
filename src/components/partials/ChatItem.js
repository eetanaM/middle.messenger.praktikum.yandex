export default `<div class="main-content__menu_chat-item" tabindex="1">
            <div class="main-content__menu_chat-item_avatar">
                <img src={{avatarSrc}} alt="Profile photo">
            </div>
            <div class="main-content__menu_chat-item_chat-info">
                <h3 class="main-content__menu_chat-item_chat-info_chat-name">{{chatName}}</h3>
                <p class="main-content__menu_chat-item_chat-info_last-message">
                    {{lastMessage}}
                </p>
            </div>
            <div class="main-content__menu_chat-item_messages-count">
                <span class="main-content__menu_chat-item_messages-count_time-stamp">{{timeStamp}}</span>
                <div class="main-content__menu_chat-item_messages-count_counter {{disabled}}">
                    <p>{{unreadMessagesCount}}</p>
                </div>
            </div>
        </div>`