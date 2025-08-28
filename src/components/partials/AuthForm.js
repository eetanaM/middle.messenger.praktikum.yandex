export default `<form action="" class="authorization__auth-form">
        <img src={{ logoUrl }} class="app__main-logo" alt="Логотип">
        {{#each inputs}}
            {{> FormInput type=type name=name placeholder=placeholder }}
        {{/each}}
        {{> Button id=button.ID text=button.textContent }}
        {{> MainLink href=link.href id=link.id text=link.textContent }}
        {{> MainLink href=preview.href id=preview.id text=preview.textContent }}
    </form>`