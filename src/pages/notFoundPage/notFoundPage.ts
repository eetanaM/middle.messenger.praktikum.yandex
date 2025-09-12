import Block from "../../utils/Block";

import { MainLink } from "../../components/partials/";

import { NOT_FOUND_TEMPLATE_DATA as MOCK } from "../../mocks/mockData";
import * as ENV from "../../utils/constants/consts"

import type { IBlockProps } from "../../utils/types/Block";

export default class NotFoundPage extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            notFoundLogoSrc: MOCK.notFoundLogoSrc,
            events: {},
            PreviewLink: new MainLink({
                ...MOCK.preview,
                appEl: props.appEl,
                events: {
                    click: ((e: Event) => {
                        e.preventDefault();
                        this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE)
                    })
                }
            })
        })
    }

    override render() {
        return `<main class="not-found">
                    <div class="not-found__logo">
                        <img src={{ notFoundLogoSrc }} alt="logo">
                        <h1>Упс, кажется Вы сбились с курса...</h1>
                    </div>
                    <div class="not-found__404">
                        <h2>404</h2>
                        <p>Page not found</p>
                    </div>
                    <nav>
                        {{{ PreviewLink }}}
                    </nav>
                </main>`
    }
}

