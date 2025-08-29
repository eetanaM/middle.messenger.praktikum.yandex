export default `<form action="" class="credentials__form">
        {{#each inputs}}
            {{> FormInput type=type name=name placeholder=placeholder }}
        {{/each}}
        {{> Button id=button.ID text=button.textContent }}
        {{> Button id=button.ID text=button.textContent }}
    </form>`