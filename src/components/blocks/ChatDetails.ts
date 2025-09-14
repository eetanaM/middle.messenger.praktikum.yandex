import Block from "../../utils/Block"
import type { IBlockProps } from "../../utils/types/Block"

export default class ChatDetails extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {},
        })
    }

    override render() {
        if (!this.props.currentChatItemId) {
            return `<section class="chat">
                        <p>Выберите чат, чтобы отправить сообщение</p>
                    </section>`
        } else {
            return `<section class="chat">
                        <header class="chat__header">
                            <h1>Chat Name {{ currentChatItemId }}</h1>
                            <button class="header__menu-button">
                                <img src={{ icons.menuButton }} alt="Menu button">
                            </button>
                        </header>
                        <div class="chat__messages-container">
                            <div class="messages-container__day-messages">
                                <h3 class="day-messages__date-stamp">
                                    19 июня
                                </h3>
                                <p class="day-messages__message opponent">
                                    Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                                    
                                    Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                                    <span class="app-timestamp">11:56</span>
                                </p>
                                <p class="day-messages__message opponent media">
                                    <img src={{ icons.mockImg }} alt="Attached image">
                                    <span class="app-timestamp">11:56</span>
                                </p>
                                <p class="day-messages__message user">
                                    Круто!
                                    <span class="app-timestamp">12:00</span>
                                </p>
                            </div>
                        </div>
                        <footer class="chat__footer">
                            {{{ SendMessageForm }}}
                        </footer>
                    </section>`
        }
    }
}
