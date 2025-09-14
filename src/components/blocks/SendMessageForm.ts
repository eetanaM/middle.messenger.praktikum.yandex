import testValidation from "../../utils/api/testValidation";
import Block from "../../utils/Block"
import type { IBlockProps } from "../../utils/types/Block"

export default class SendMessageForm extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {
                submit: ((e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();

                    let isValidationPassed = true;
                    const form = e.target as HTMLFormElement
                    const messageInput = form.querySelector("input")
                    if (!messageInput) {
                        throw new Error("No message input in DOM")
                    }
                    const inputName = messageInput.name;
                    const inputValue = messageInput.value;

                    if (!testValidation(inputName, inputValue)) {
                        isValidationPassed = false;
                    }

                    if (isValidationPassed) {
                        const formData: {[key: string]: string} = {}
                        formData[messageInput.name] = messageInput.value

                        console.log(formData)
                    } else {
                        // Пока не реализовывал отображение подсказки по пустому полю для сообщения
                        // Если потребуется добавлю
                        console.log("Validation failed")
                    }
                })
            }
        })
    }

    override render() {
        return `<form action="" class="footer__send-message-form">
                    <button type="button" class="send-message-form__attach-file-button">
                        <img src={{ icons.paperClip }} alt="Clip">
                    </button>
                    {{{ FormInput }}}
                    <button type="submit" class="send-message-form__send-button">
                        <img src={{ icons.sendButton }}  alt="Arrow">
                    </button>
                </form>`
    }
}